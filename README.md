This is a HBOMax Clone developed using React.js, Next.js, Context API, TMDB API, HTML 5, SASS, and SCSS.

Link to App- [https://max-clone.netlify.app/movie/572802](https://max-clone.netlify.app/)

## Create and Login Pages

First I built a Create page which allows users to create their profile so they can utilize the app.

![954F35E5-AC7B-4DAA-9BDA-4E415AFA3953_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/0b556900-bbf9-4d1e-872c-7ec4f023668a)

Next I focused on the login page which allows users to login to the application and view the homepage. I also set up authentication checks to ensure the user was actually logged in before navigating to the home page. If there is no user, there is an automatic redirect to the Create page for the user to create a profile.

![D12B980D-AE4F-4D96-843E-B238F21D2E53_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/f044da6d-c74f-4d16-9403-a9649bc544ec)

## Home Page

Featured Media Component

The Featured Media component was the first component I built and it contains a preview video of the movie being featured. It also has hover effects with a linear gradient, movie title, and a button to see more information about the film.

![EDE065A4-BEAF-4EF8-864C-74DA4DD4EBF3_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/44c7c2ce-2f63-49df-84fa-8b59b08f38ce)

Header Component

Next I moved on to the Header component which contains a button to access the SideNav, Search Modal, Logo which redirects to the home page, and an account logo which opens the Account Modal. The Header is set to be transparent until hovered upon causing the background to turn black.

![A6C7D018-3E1B-4A70-A973-25A988B7C4FB_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/de00d805-66c4-4844-b21b-520f0137b6e8)

Media Row Component

The Media Row component came next and required the use of the TMDB API to fetch data about movies. For this I had to refer to their documentatiopn to ensure that the movies displayed correlated with each section based off of genre. I also developed a function which randomly displayed the movie posters so that users would always receive a fresh set of titles any time the page refreshes or they navigate away and come back to the home page. Lastly I added hover effects with a linear gradient and play button. When clicked the app navigates to a page with more details about that specific movie along with cast information and similar titles.

![CBE6ED25-DE65-4419-B87F-D89DCA3289CE_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/6aa89bb1-8992-47fe-9489-f128dd221569)

## Dynamic Routes

To set up each individual media page I utilized dynamic routing while also repurposing the Featured Media and Media Row Components utilizing server side props.
I used the props from the server in the API calls to dynamically render the correct media poster, similar titles, and cast and crew information. This required me to delve a bit deeper into the TMDB documentation to retreive each set of data whcih I needed.

Dynamic View Part 1
![4BC9EA9A-141E-4B85-86E1-67CF5B6379BF_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/2ca708ae-b181-45e6-9402-0cf95f70a923)

Dynamic View Part 2
![58ED55FC-F235-4685-850B-D2E6142EF914_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/faa6b035-3bba-40af-bcbb-6cce661395a6)

## Dynamic Media Type and Genre Pages

In a similar fashion I utilized Dynamic routes and server side props to build a page for only movies and series respectively. On those pages i built a Genre Nav component which displayed all the genre choices available for both Movies and Series. When selected the page renders media from the specific genre the user has chosen. This required me to make slight changes to the props in the Featured Media, Media Row, and Genre Nav components as the data sets the TMDB API returned for movies and tv had different keys.

Side Nav to access Movies and TV Series pages
![DA11A69C-A1D2-4DCC-BAFA-E6DFF97EC990_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/66236cb0-c1bc-436b-8d88-56c29c714059)


TV Home Page Part 1
![FD412EE6-628B-4418-9E1A-A30B64EC38FE_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/bd947891-0c9e-45dd-b8d1-9b0cc172e577)

TV Home Page Part 2
![74EFB3F7-E710-4760-9984-45EDF3112B2A_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/d669304a-40d4-465d-895c-3c173e89b9d0)

Genre Page Part 1 (Westerns)
![563AC306-073D-4076-B388-5F63FE7D4A6C_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/10218684-bce8-4850-ac60-04ce22b5ab42)

Genre Parge Part 2
![3F59E429-DB89-47BA-8355-8333B99E7C36_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/d474ce13-9411-4827-b9fd-a365382b4df1)


## Search Modal
The Search Modal was the next component built and was pretty straight forward. I initially set the component to fetch popular movies whtn the component mounts. The top twenty movies are initially displayed in the modal. From there i set up a handle input function to search and fetch results as users input text in the search bar. Next i set up a function to render the top 20 search results based on the inputs provided by the user.

Search Modal Inital View
![0FC95158-38BC-4737-AE6F-689F4202A906_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/df1780d2-20bd-488e-b5f1-1dd8e7e3c7e8)

Search Modal Final View
![649F617D-0464-4532-ACF2-C163CAE70201_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/e210f45d-b89d-4803-b589-b1065fecf415)


## Account Modal

The last component I built was the Account Modal. I initially set up sign out functionality which redirects the user to the login page when sign out is clicked. Next I set up the watch list functionality which fetches the posters of all the media titles which the user adds to the watchlist. Each movie title on the app has an add button which displays when hovered over. When the add button is clicked the Media Type and ID are saved to local storage then utilized to display the correct information in the watchlist.

Account Modal Inital View
![C813E386-2A91-4870-B034-7902B847705B_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/88bce86c-8d0c-4eda-80c5-b7b3296f2cf4)

Account Modal Watchlist View
![D7DEDBBA-81F1-427F-A0A5-C8CB40AC2572_1_105_c](https://github.com/Asimmons8228/hbo-clone/assets/96853510/91014512-b81d-42d6-8876-17829222401b)
