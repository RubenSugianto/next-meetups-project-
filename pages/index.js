// our-domain.com/

import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'Cristiano Ronaldo Fan Meetup',
//         image: 'https://akcdn.detik.net.id/community/media/visual/2024/11/06/cristiano-ronaldo-1.jpeg?w=600&q=90',
//         address: 'Juventus Stadium, Turin, Italy',
//         description: 'Join fellow fans of Cristiano Ronaldo for a fun evening celebrating his legendary football career with games, trivia, and memorabilia.'
//     },
//     {
//         id: 'm2',
//         title: 'Messi vs Ronaldo Debate Night',
//         image: 'https://assets.goal.com/images/v3/blt39e4f00009a4e7a2/1437082061.jpg?auto=webp&format=pjpg&width=3840&quality=60',
//         address: 'Camp Nou Conference Hall, Barcelona, Spain',
//         description: 'An engaging evening of friendly debate between Messi and Ronaldo fans. Come share your thoughts, hear opinions, and enjoy some football-themed snacks!'
//     },
//     {
//         id: 'm3',
//         title: 'Football Legends Expo',
//         image: 'https://cdn.grid.id/crop/0x0:0x0/700x465/photo/2024/11/26/cristiano-ronaldo-5jpeg-20241126124502.jpeg',
//         address: 'International Sports Arena, London, UK',
//         description: 'A meetup for football lovers featuring exhibits on legendary players, including Cristiano Ronaldo, interactive games, and a screening of classic matches.'
//     }
// ];


function HomePage(props) {
    return <MeetupList meetups={props.meetups} />
}

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res
//     // fetch data from an API

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }

export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://ruben:ruben@cluster0.x7jxsfh.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    
    const db = client.db();
    
    const meetupsCollection = db.collection('meetups');
          
    const meetups = await meetupsCollection.find().toArray();

    client.close();
    
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 1
    };
}

export default HomePage;