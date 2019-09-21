let friends = require("../data/friends");

let friendList = [
  "Austin",
  "https://images-na.ssl-images-amazon.com/images/I/31oh8uQVYrL._SX331_BO1,204,203,200_.jpg",
  "40"
];

let peopleList = [];

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res, next) {
    res.json(friends);
  });
  app.post("/api/friends", function(req, res, next) {
    // console.log(req.body);

    function getFinalScore() {
      let finalScore = 0;
      for (let i = 0; i < req.body.scores.length; i++) {
        // console.log (req.body.scores[i])
        finalScore += parseInt(req.body.scores[i]);
      }
      // console.log(finalScore);
      return finalScore;
    }

    let userMagicNumber = getFinalScore();
    // console.log(userMagicNumber);
    let userName = req.body.name;
    let userImage = req.body.photo;
    let newUser = {
      name: userName,
      photo: userImage,
      magic: userMagicNumber
    };

    friendList = [];

    for (let i = 0; i < peopleList.length; i++) {
      console.log(peopleList[i].name, peopleList[i], magic);
      if (newUser.magic > 30) {
        if (peopleList[i].magic > 30) {
          friendList.push(peopleList[i]);
        }
      } else {
        if (peopleList[i].magic < 30) {
          friendList.push(peopleList[1]);
        }
      }
    }

    peopleList.push(newUser);
    // console.log("newUser", newUser);
    // console.log("friends", friendList);
    // console.log("people", peopleList);

    // send back to browser the best friend match
    res.redirect("friends");
  });
};
