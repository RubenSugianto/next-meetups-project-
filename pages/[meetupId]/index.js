import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
import { Fragment } from "react";

function MeetupDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name='description'
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail 
                title= {props.meetupData.title}
                image= {props.meetupData.image}
                address= {props.meetupData.address}
                description= {props.meetupData.description}
            />
        </Fragment>
    );
}


export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://ruben:ruben@cluster0.x7jxsfh.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    );
        
    const db = client.db();
        
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1}).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}


export async function getStaticProps(context) {
    // fetch data for a single meetup
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://ruben:ruben@cluster0.x7jxsfh.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
        
    const db = client.db();
        
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)});

    console.log(selectedMeetup);

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        }
    }
}

export default MeetupDetails;