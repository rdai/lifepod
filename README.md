## LifePod 

### Vision 

This project aims to produce an one feed, simple, podcast player for those with low literacy and/or low mobile phone literacy.

There are many podcast players out there, but if you are one of the many users who has low literacy, or low mobile phone literacy (i.e. new to smart phones), the typical podcast player app might have too much of a learning curve for you with these steps
1. Search for a feed
2. Subscribe to it
3. Play it, 
4. Doing all this with instructions in English. 

In the same context, physical players have their uses but the process of updating is difficult. How much time and expense is required to keep a group of users updated using SD cards?

This app opens straight to one feed, and only one feed, with simple buttons that users can just push and play. You can find and play past episodes, search, share, etc.

### Features
1. The app should subscribe to a feed already so when it opens it displays the content of that feed. _**Completed on 2017-11-07**_
2. Ability to play/pause/stop _**Completed on 2017-11-07**_
3. Ability to download episodes ahead of time and play back from the downloaded file when present
4. Sharing the app
5. Sharing downloaded episodes (bulk?)


### Wishlist (May or may not need to be implemented, depends on user feedback)
1. 30 seconds forward/back
2. remember and resume play on each track
3. ability to load more episodes instead of displaying the whole list up front
4. Tags/categories, way to search for episodes
5. Statistics (beyond what pod hosting website alredy provide)
6. Follow up/contact podcaster
7. Move feed JSON to a static file that is populated by CRON php job instead of real time generated, this way we can move the podcast server without disrupting service.
