//Declaration of a gameObjectsRow as an object
//This object represent a row from 0 to 2 clouds
//Clouds are added randomly, 'addOrNot' is for this purpose
gameObjectsRow = function(){

    this.clouds = [];
    this.addOrNot = 0;
    
    this.rot = 0;
    this.hasCrystal = false;
    
    this.mesh = new THREE.Object3D();
    
}
    
    //function for removing a row
gameObjectsRow.prototype.removeRow = function(){

    for(var i = 0; i < this.clouds.length; i++){
      if(this.clouds[i].name == "crystal")
        scene.remove(this.clouds[i].topPointLight);
    }
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
          if(addOrNot > 0.3){
              var crystalOrCloud = Math.random();
              var c; 
              if(this.hasCrystal == false && crystalOrCloud < 0.5){
                c = new Crystal(22);
                this.hasCrystal = true;
              }
              else{
                c = new Cloud();
              }
                
          
              c.mesh.position.x = -objectPosDelta + objectPosDelta * i;     //positioning in a row
          
              this.mesh.add(c.mesh);
              this.clouds.push(c);

          
          }
      }
      else{
        addOrNot = Math.random();
        if(this.hasCrystal == false && addOrNot > 0.85){
          var c = new Crystal(22);
          c.mesh.position.x = -objectPosDelta + objectPosDelta * i;     //positioning in a row
          
          this.mesh.add(c.mesh);
          this.clouds.push(c);

        }
      }
    }
}