
## Sympocia_Frontend

The current situation with social media platforms is very interesting. People care more about their follower count, the number of likes, and views than actually being their most authentic selves. How many times have you wanted to post something but were worried about how it made you look? Sympocia is trying to change this.

Sympocia is the first platform designed to give you the opportunity to be your most authentic selves. How does it accomplish this? For one there are new ways to express yourself like video/audio descriptions and a new kind of comment system. Because people can interact with each other on a more personal level, the result of this causes a new kind of social space on the platform. We call these spaces symposiums.

Similar to subreddits, symposiums are sections dedicated to a topic but go much deeper than subreddits. There are countless ways to interact with people and also a democratically elected moderation system.

These are just a few of the things that are new to Sympocia. So if you are someone who is tired of the current state of social media platforms, you should sign up for Sympocia and join the movement.

The architecture consists of two microservices dedicated to video and image compression. Additionally, there are two other microservices that are used for the feed generation and server/data handling. The feed generation microservice uses java and the algorithm for item-based collaborative filtering but since it is connected to the db I wont be displaying it on github for now. What you're seeing right now is the frontend code for Sympocia that uses the React framework.
