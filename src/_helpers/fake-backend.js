// array in local storage for registered users
let users = JSON.parse(localStorage.getItem("users")) || [];
let articles = JSON.parse(localStorage.getItem("articles")) || [];

export function configureFakeBackend() {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        // authenticate
        if (url.endsWith("/users/authenticate") && opts.method === "POST") {
          // get parameters from post request
          let params = JSON.parse(opts.body);

          // find if any user matches login credentials
          let filteredUsers = users.filter((user) => {
            return (
              user.username === params.username &&
              user.password === params.password
            );
          });

          if (filteredUsers.length) {
            // if login details are valid return user details and fake jwt token
            let user = filteredUsers[0];
            let responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: "fake-jwt-token",
            };
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson)),
            });
          } else {
            // else return error
            reject("Username or password is incorrect");
          }

          return;
        }

        // get users
        if (url.endsWith("/users") && opts.method === "GET") {
          // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(users)),
            });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // get user by id
        if (url.match(/\/users\/\d+$/) && opts.method === "GET") {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            // find user by id in users array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            let matchedUsers = users.filter((user) => {
              return user.id === id;
            });
            let user = matchedUsers.length ? matchedUsers[0] : null;

            // respond 200 OK with user
            resolve({ ok: true, text: () => JSON.stringify(user) });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // register user
        if (url.endsWith("/users/register") && opts.method === "POST") {
          // get new user object from post body
          let newUser = JSON.parse(opts.body);

          // validation
          let duplicateUser = users.filter((user) => {
            return user.username === newUser.username;
          }).length;
          if (duplicateUser) {
            reject('Username "' + newUser.username + '" is already taken');
            return;
          }

          // save new user
          newUser.id = users.length
            ? Math.max(...users.map((user) => user.id)) + 1
            : 1;
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));

          // respond 200 OK
          resolve({ ok: true, text: () => Promise.resolve() });

          return;
        }

        // delete user
        if (url.match(/\/users\/\d+$/) && opts.method === "DELETE") {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            // find user by id in users array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            for (let i = 0; i < users.length; i++) {
              let user = users[i];
              if (user.id === id) {
                // delete user
                users.splice(i, 1);
                localStorage.setItem("users", JSON.stringify(users));
                break;
              }
            }

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve() });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // delete article
        if (url.match(/\/articles\/\d+$/) && opts.method === "DELETE") {
          // check for fake auth token in header and return article if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            // find article by id in articles array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            for (let i = 0; i < articles.length; i++) {
              let article = articles[i];
              if (article.id === id) {
                // delete article
                articles.splice(i, 1);
                localStorage.setItem("articles", JSON.stringify(articles));
                break;
              }
            }

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve() });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        if (url.endsWith("/articles/create") && opts.method === "POST") {
          // get new user object from post body
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            let newArticle = JSON.parse(opts.body);

            // validation
            let duplicateArticle = articles.filter((user) => {
              return articles.title === newArticle.title;
            }).length;
            if (duplicateArticle) {
              reject('title "' + newArticle.title + '" is already taken');
              return;
            }

            // save new user
            newArticle.id = articles.length
              ? Math.max(...articles.map((user) => user.id)) + 1
              : 1;
            articles.push(newArticle);
            localStorage.setItem("articles", JSON.stringify(articles));

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve() });

            return;
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }
        }

        if (url.endsWith("/articles/update") && opts.method === "PUT") {
          // get new user object from post body
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            let newArticle = JSON.parse(opts.body);

            // validation
            let duplicateArticle = articles.filter((user) => {
              return articles.title === newArticle.title;
            }).length;
            if (duplicateArticle) {
              reject('title "' + newArticle.title + '" is already taken');
              return;
            }

            // find article by id in articles array
            let id = newArticle.id;
            for (let i = 0; i < articles.length; i++) {
              let article = articles[i];
              if (article.id === id) {
                // delete article
                articles.splice(i, 1);
                articles.push(newArticle);
                localStorage.setItem("articles", JSON.stringify(articles));
                break;
              }
            }

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve() });

            return;
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }
        }

        // get article by id
        if (url.match(/\/articles\/\d+$/) && opts.method === "GET") {
          // check for fake auth token in header and return article if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            // find article by id in articles array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            let matchedarticles = articles.filter((article) => {
              return article.id === id;
            });
            let article = matchedarticles.length ? matchedarticles[0] : null;

            // respond 200 OK with article
            resolve({ ok: true, text: 
              () => Promise.resolve(JSON.stringify(article))
             });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // get articles
        if (url.endsWith("/articles") && opts.method === "GET") {
          // check for fake auth token in header and return articles if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(articles)),
            });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }
        debugger;
        if (url.endsWith("/upload") && opts.method === "POST") {
          // get new user object from post body
          debugger;
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            
            let ddd = JSON.parse(opts.body);

            localStorage.setItem("files", JSON.stringify(ddd));

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve() });

            return;
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }
        }

        // pass through any requests not handled above
        realFetch(url, opts).then((response) => resolve(response));
      }, 500);
    });
  };
}
