//Declaration of a gameObjectsRow as an object
//This object represent a row from 0 to 2 clouds
//Clouds are added randomly, 'addOrNot' is for this purpose
gameObjectsRow = function(){

    this.clouds = [];
    this.addOrNot = 0;
    
    this.rot = 0;
    
    this.mesh = new THREE.Object3D();
    
}
    
    //function for removing a row
gameObjectsRow.prototype.removeRow = function(){
    this.clouds.splice(0);
    
    scene.remove(this.mesh);
}
    
    //Adds clouds
gameObjectsRow.prototype.addClouds = function(){
    for(var i = 0; i < 3; i++)
    {
      if(this.clouds.length < 2)                                      //no more than 2 clouds
      {
          addOrNot = Math.random();
          if(addOrNot > 0.5){
              var crystalOrCloud = Math.random();
              var c; 
              if(crystalOrCloud > 0.7)
                c = new Cloud();
              else
                c = new Crystal(22);
          
              c.mesh.position.x = -objectPosDelta + objectPosDelta * i;     //positioning in a row
          
              this.mesh.add(c.mesh);
              this.clouds.push(c);
          
          }
      }
      else{
        addOrNot = Math.random();
        if(addOrNot > 0.85){
          var c = new Crystal(22);
          c.mesh.position.x = -objectPosDelta + objectPosDelta * i;     //positioning in a row
          
          this.mesh.add(c.mesh);
          this.clouds.push(c);

        }
      }
    }
}