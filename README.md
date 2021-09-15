# JobSeeker

JobSeeker is a site where an individual user can have a way to keep track of job searches
  - They will be able to save a job 
  - keep track of the interview
  - and also be a calendar of sorts that only contain job interviews 


## Modals 

Association
	A user will have many jobs aka -> "one to many relation" .


User : 
- Name ->  str
- email ->  str
- password ->  str
- favorites ->  array of top 3 three jobs (method)

Job: 
- position ->  str
- company name ->  str
- hopeful salary ->  int
- status ->  interviewing | rejected ->  str
- offer ->  NIL if not given 
- interviews ->  array of interview dates (method)