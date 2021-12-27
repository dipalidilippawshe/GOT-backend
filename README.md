Let us know by when you will be able to submit the assignment.
 
Game of Thrones - Battle Catalogue


Backend: 
Import the CSV file included, to load the data in MongoDB (mLab/MongoAtlas).
 
 
Use battle data to build an API Server using Node.JS/Express which exposes following 4 endpoints:

/list
returns list(array) of all the battles that have taken place.
E.g. ['Battle of the Golden Tooth', 'Battle of Deepwood Motte',....]

/count
returns the total number of battles that had occurred.

/search
/search?king=Robb Stark
- return list of battles (and details) where 'attacker_king' or 'defender_king' was 'Robb Stark'
Should also work for multiple queries


Frontend (React/Redux/HTML/CSS)
 
Prepare a basic but neat UI to consume Battle API. 
 
Create a Search Bar with autocomplete. When searched for a specific battle(Location) the data should be loaded in similar kind of template with all the details available in the Database. 
Assume Suitable Data wherever required.
 
Post-Completion of Task
1. Upload Frontend & Backend to Github Repository and share the URL
2. Host the app on Heroku/AWS. 


