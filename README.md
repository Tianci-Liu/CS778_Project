CS778_Project
===

Preparation
---

Get into [the project link](https://github.com/Tianci-Liu/CS778_Project) and click code button. You can see the HTTPS and click copy button.

Use `git clone` to clone the project into your local place.

Before setup the project, you should install `npm` or `yum` in your local place.

Frontend
---

**What is this part**

The main content of this part is to show the wabpage of the project.

In the homepage, there are three models in the page, corresponding three different project of algorithm backend.

**How to setup?**

Click into `frontend` folder.

Open the project into a code editor or just open **PowerShell** or **terminal**.

Use `npm install` or `yum install` to download and install dependencies.

Use  `npm start` or `yum start` to start the frontend server. The address of the page is `127.0.0.1:8080/#`.

**Importance api information**

The api files of frontend are set in `/frontend/src/apis/project~.js`. 

To change the host address-port of algorithm-end, the `alg_host` should be set correctly. 

The path of different api is set in parameter `url` and the function of request is Call in class `Ajax`.

The files call api is in `/frontend/src/views/page~.js`. To adjust the request and respond, the parameter in page should be changed.

**Format of req and res** (This should be edit after change)

*project1*

req:

```
{
    "name": string,
    "birthday": string,
    "gender": string,
    ...
}
```

res:

```
{
    "input":{ ...req },
    "generated_text": string,
}
```

*project3*

req:

```
{
    "factsRule": string,
    "judgeStatement": sting
}
```

res:

```
{
    "input":{ ...req },
    "label": string,
    "true_probability": Double,
    "false_probability": Double,
}
```

Backend
---

**What is this part**

This part main responsible for saving commented data. 

In this section, the four basic methods of adding, deleting, modifying and querying are established, and some parameters are built during the query to better aggregate data.

According to the data characteristics, we can only edit the contents of rank and comment by adjusting the content of the editing method to the minimum.

The default interface is 8088

**How to setup?**

Click into `server` folder.

Open the project into a code editor or just open **PowerShell** or **terminal**.

Use `npm install` or `yum install` to download and install dependencies.

Use  `npm start` or `yum start` to start the frontend server. The address of the page is `127.0.0.1:3000/#`.




