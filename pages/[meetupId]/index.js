import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
    return (
        <MeetupDetail 
        title= 'Cristiano Ronaldo Fan Meetup'
        image= 'https://akcdn.detik.net.id/community/media/visual/2024/11/06/cristiano-ronaldo-1.jpeg?w=600&q=90'
        address= 'Juventus Stadium, Turin, Italy'
        description= 'Join fellow fans of Cristiano Ronaldo for a fun evening celebrating his legendary football career with games, trivia, and memorabilia.'
        />
    );
}


export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'm1',
                },
            },
            {
                params: {
                    meetupId: 'm2',
                },
            },
        ],
    };
}


export async function getStaticProps(context) {
    // fetch data for a single meetup
    const meetupId = context.params.meetupId;

    console.log(meetupId);

    return {
        props: {
            meetupData: {
                title: 'Cristiano Ronaldo Fan Meetup',
                id: meetupId,
                image: 'https://akcdn.detik.net.id/community/media/visual/2024/11/06/cristiano-ronaldo-1.jpeg?w=600&q=90',
                address: 'Juventus Stadium, Turin, Italy',
                description: 'Join fellow fans of Cristiano Ronaldo for a fun evening celebrating his legendary football career with games, trivia, and memorabilia.'
            }
        }
    }
}

export default MeetupDetails;