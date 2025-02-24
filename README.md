# 0x04. Files manager

> Back-end |
> JavaScript |
> ES6 |
> NoSQL |
> MongoDB |
> Redis |
> NodeJS |
> Express JS |
> Kue |

---
> Weight: 1
>
> Project to be done in teams of 2 people (your team: Blessed Oigbochie)
>
> Project will start Jun 27, 2024 6:00 AM, must end by Jul 4, 2024 6:00 AM
>
> Checker was released at Jun 29, 2024 12:00 AM
>
> Manual QA review must be done (request it when you are done with the project)
>
> An auto review will be launched at the deadline

---
_This project is a summary of this back-end trimester: authentication, NodeJS, MongoDB, Redis, pagination and background processing._

**The objective is to build a simple platform to upload and view files:**

1. **User authentication via a token**
2. **List all files**
3. **Upload a new file**
4. **Change permission of a file**
5. **View a file**
6. **Generate thumbnails for images**

---

**_You will be guided step by step for building it, but you have some freedoms of implementation, split in more files etc… (utils folder will be your friend)_**
**_Of course, this kind of service already exists in the real life - it’s a learning purpose to assemble each piece and build a full product._**

**Enjoy!**

## Resources

_Read or watch:_

---

* Node JS getting started
* Process API doc
* Express getting started
* Mocha documentation
* Nodemon documentation
* MongoDB
* Bull
* Image thumbnail
* Mime-Types
* Redis

## Learning Objectives

**_At the end of this project, you are expected to be able to explain to anyone, without the help of Google:_**

---

* how to create an API with Express
* how to authenticate a user
* how to store data in MongoDB
* how to store temporary data in Redis
* how to setup and use a background worker

## Requirements

* Allowed editors: vi, vim, emacs, Visual Studio Code
* All your files will be interpreted/compiled on Ubuntu 18.04 LTS using node (version 12.x.x)
* All your files should end with a new line
* A README.md file, at the root of the folder of the project, is mandatory
* **Your code should use the js extension**
* **Your code will be verified against lint using ESLint**
