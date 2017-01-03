angular.module('services', [])

.factory('Games', function($http) {
    //localStorage.clear();

  var allGames = JSON.parse(window.localStorage.getItem('games'));
  if (allGames == null){
    allGames = [];
  }
  

  return {
    all: function() {
      allGames = JSON.parse(window.localStorage.getItem('games'));
      return allGames;
    },
    addAll: function(newAllGames){
      allGames = newAllGames;
      window.localStorage.setItem('games', JSON.stringify(allGames));
      //alert(JSON.parse(window.localStorage.getItem('games')));
    },
    get: function(gameId) {
      if(allGames !== null){
        for (var i = 0; i < allGames.length; i++) {
          if (allGames[i].id == gameId) {
            return allGames[i];
          }
        }
      }
      return null;
    },
    getByCountryId: function(countryId){
      var gamesReturned = [];
      for (var i = 0; i < allGames.length; i++) {
        if (allGames[i].country_id == countryId) {
          gamesReturned.push(allGames[i]);
        }
      }
      if(gamesReturned == []){
        return null;
      }else{
        return gamesReturned;
      }
    }
  };
})













.factory('Countries', function($http) {
  var allCountries = JSON.parse(window.localStorage.getItem('countries'));
  if (allCountries == null){
    allCountries = [];
  }
  

  return {
    all: function() {
      allCountries = JSON.parse(window.localStorage.getItem('countries'));
      return allCountries;
    },
    addAll: function(newallCountries){
      allCountries = newallCountries;
      window.localStorage.setItem('countries', JSON.stringify(allCountries));
      //alert(JSON.parse(window.localStorage.getItem('games')));
    },
    get: function(countryCode) {
      for (var i = 0; i < allCountries.length; i++) {
        if (allCountries[i].properties.code == countryCode) {
          return allCountries[i];
        }
      }
      return null;
    }
  };
})




.factory('Continents', function($http) {
  var allContinents = JSON.parse(window.localStorage.getItem('continents'));
  if (allContinents == null){
    allContinents = [];
  }
  

  return {
    all: function() {
      allContinents = JSON.parse(window.localStorage.getItem('continents'));
      return allContinents;
    },
    addAll: function(newallCountries){
      allContinents = newallCountries;
      window.localStorage.setItem('continents', JSON.stringify(allContinents));
      //alert(JSON.parse(window.localStorage.getItem('games')));
    },
    get: function(countryCode) {
      for (var i = 0; i < allCountries.length; i++) {
        if (allContinents[i].properties.code == countryCode) {
          return allContinents[i];
        }
      }
      return null;
    }
  };
})







/*
SET AND GET METHOD FOR USER AUTHENTICATION 
*/
.factory('Users', function(){
 
 return{
  setConnected: function(user){
      window.localStorage.setItem('connectedUser', JSON.stringify(user));
    },
    getConnected: function(){
      connectedUser = JSON.parse(window.localStorage.getItem('connectedUser'));      
      return connectedUser;
    }

 }
    
});

    /*just in case needed*/
 //localStorage.clear();
  // var users = JSON.parse(window.localStorage.getItem('users'));
  // if(users == null){
  //   users = [];
  // }

  // return {
    /*all: function() {
      users = JSON.parse(window.localStorage.getItem('users'));
      return users;
    },
    add: function(newUser){
      if(users == null){
        users = [];
      }
      users.push(newUser);
      window.localStorage.setItem('users', JSON.stringify(users));
    },
    get: function(username) {
      if(users !== null){
        users = JSON.parse(window.localStorage.getItem('users'));
        for (var i = 0; i < users.length; i++) {
          if (users[i].username == username) {
            return users[i];
          }
        }
      }
      return null;
    },*/





    /*888888888888888888*/
    /*isGameSaved: function(gameId){
      if(gameId !== null && gameId !== ""){
        users = JSON.parse(window.localStorage.getItem('users'));
        for (var i = 0; i<users.length; i++) {
          if(users[i].savedGames !== undefined){
            for(var j=0; j<users[i].savedGames.length; j++){
              if (users[i].savedGames[j] == gameId) {
                return true;
              }
            }
          }
        }
      }
      return false;
    },
    addSavedGame: function(gameId){
      var connectedUser = this.get(this.getConnected().username);
      if(this.isGameSaved(gameId) == false){
        for (var i = 0; i < users.length; i++) {
          if (users[i].username == connectedUser.username) {
            users[i].savedGames.push(gameId);
            break;
          }
        }
        window.localStorage.setItem('users', JSON.stringify(users));
        //alert("saved games : "+ JSON.stringify(users));
      }
    },
    removeSavedGame: function(gameId){
      var connectedUser = this.get(this.getConnected().username);
      if(this.isGameSaved(gameId) == true){
          for (var i=0; i<users.length; i++) {
              if (users[i].username == connectedUser.username) {
                  var gameIndex = -1;
                  for(var j=0; j<users[i].savedGames.length; j++){
                    if (users[i].savedGames[j] === gameId) {
                        gameIndex = j;
                    }
                  }
                  if(gameIndex != -1){
                    users[i].savedGames.splice(gameIndex, 1);
                  }
                  break;
              }
          }
        window.localStorage.setItem('users', JSON.stringify(users));
        //alert("saved games : "+ JSON.stringify(users));
      }
    }*/

