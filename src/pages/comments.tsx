





export default function Comments(){
    return (
        <div >

        </div>
    )
}


export async function getStaticProps(){
    let res = await fetch("https://dummyjson.com/comments")
    let rawData = await res.json()

    return {
        props: {
            rawData,
        },
        revalidate: 60
    }
}

