import React, {useState, useEffect} from 'react'
import service from '../appwrite/service'
import { Container, PostCard } from '../components'

const AllPost = () => {

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        //getAllPosts([]) gives the posts in array
        service.getAllPosts([])
        .then((posts)=>{
            if(posts) setPosts(posts.documents)
        })

        // console.log(posts)
    })
  return (
    <div className='py-8 w-full'>
        <Container>
            <div className='flex flex-wrap'>
            {posts?.map((post)=>(
               <div key={post.$id} className='p-2 w-1/4'>
                <PostCard {...post}/>
                {/* {console.log(post)} */}
               </div>
            ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost