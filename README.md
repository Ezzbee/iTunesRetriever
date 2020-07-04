This app can be used to search for contents within the iTunes Store and Apple Books Store. It supports searches for a 
variety of content; including books, movies, podcasts, music, music videos, audiobooks, and TV shows.

It consists of a back-end, Node.js and Express server which leverages the iTunes API to conduct seraches and a front-end
React app which handles the display of the search results. 

To run this app:
1. cd backend
2. npm install
3. npm start
4. cd frontend
5. npm install
6. npm start
7. http://localhost:3000   
8. Enter the search term in the search box
9. Select the media type you are interested in, the default being "all"
10. Specify the maximum no of contents to be returned by the search, the default being 10

To mark a content as a favorite or otherwise, click on the heart image at the bottom of the content to toggle your selection.
The app keeps a tally of your selections at the bottom of the page.

For additional details about any particular content, click on the "More" buton.

  