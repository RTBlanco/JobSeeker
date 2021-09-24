# JobSeeker

JobSeeker is a site where an individual user can have a way to keep track of job searches
  - They will be able to save a job 
  - keep track of the interview
  - and also be a calendar of sorts that only contain job interviews 


## Modals 

Association
	A user will have many jobs aka -> "one to many relation". A job will have many interviews


### User : 
- Name ->  str
- email ->  str
- password ->  str
- favorites ->  array of top 3 three jobs (method)

### Job: 
- position ->  str
- company name ->  str
- hopeful salary ->  int
- status ->  interviewing | rejected ->  str
- offer ->  NIL if not given 
- interviews ->  array of interview dates (method)

### Interview: 
 - date -> date
 - notes - str

# Routes (TODO: Turn this into a table): 
## User
| Action | Verb | Route |
|--------|------|-------|
| LOGIN  | POST | ```/user/login``` | 
| SIGNUP | POST | ```/user/new``` |
| FETCH USER | GET | ```/user``` |
| EDIT USER | PATCH | ```/user``` |
| DELETE USER | DELETE | ```/user``` |

## Job 
| Action | Verb | Route |
|--------|------|-------| 
| FETCH JOB | GET | ```/user``` |
| FETCH ALL JOBS | GET | ```/user``` |
| EDIT JOB | PATCH | ```/user/``` |
| DELETE JOB | DELETE | ```/user``` |


# Note - Need to start postgresql server to use 
  - [Windows Wsl2](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql)
  