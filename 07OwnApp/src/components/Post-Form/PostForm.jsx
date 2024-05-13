import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useCallback } from "react";

//this form will be used for both editing a post and adding a post, if a post is sent to this form as prop, then edit or else add post
const PostForm = ({ post }) => {
  const { register, control, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authReducer.userData);

  //the form submit function should work for both edit and add, design it accordingly
  const onFormSubmit = async (data) => {
    if (post) {
      //edit
      //1. If there's a file upload it
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      //2. If there's a new file to upload, delete the old file
      if (file) {
        service.deleleFile(post.featuredImage);
      }

      //3. Now update the post (this will run even if there's no file to upload)
      const updatedPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      //4. if post is updated, navigate to post
      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`);
      }
    } else {
      //1. If there's a file to upload, do it first
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      //2. If file doesn't exists, don't move further
      if (!file) throw console.error("A file is must for blog");

      //3. If file exists, update the file to data
      data.featuredImage = file.$id;

      //4. Now create a post with the data
      const createdPost = await service.createPost({
        ...data,
        userId: userData.$id,
      });

      if (!createdPost) throw console.error("Post creation unsuccessfull");

      if (createdPost) navigate(`/post/${createdPost.$id}`);
    }
  };

  //method to transform the slug, (i.e) 
  //title: chai aur code ; slug: chai-aur-code
  //to achieve this watch the title and update slug
  const slugTransform = useCallback((value) =>{
        if(value && typeof value === 'string'){
            return value 
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
        }

        return ''
  })


  //to use the slugTransform method
  React.useEffect(()=>{
    const subscription = watch((value, {name})=>{
        if(name === 'title'){
            setValue('slug', slugTransform(value.title,{shouldValidate: true}))
        }
    })

    return ()=> subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
            <Input 
                label="Title: "
                placeholder="Title"
                className="mb-4"
                {...register("title", {required: true})}
            />
            <Input 
                label="Slug: "
                placeholder="Slug"
                className="mb-4"
                {...register("slug", {required: true})}
                onInput={(e)=>{
                    setValue("slug", slugTransform(e.currentTarget.value),{shouldValidate:true})
                }}
            />
            <RTE label="Content: " name="content" control={control} defaultValue={getValues("content")}/>
        </div>
        <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })} //if post is not there (create post) required: true; if already post exists(edit post) required: false;
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
    </form>
  )
};

export default PostForm