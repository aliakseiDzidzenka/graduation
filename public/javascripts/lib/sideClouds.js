//Declaration of a SideCloud as an object
//The character (flamingo) is never interacting with them
//The clouds are staggered (left - rigth side) around the Ground instance with angular difference of 2 'angle' on each side
SideClouds = function(){

    this.mesh = new THREE.Object3D();
    
    //Creaton of left side clouds
    for(var i = 0; i < sideCloudsCount; i++)
    {
        var c = new Cloud();
        
        var a = 2 * angle * i;
        
        c.mesh.position.z = Math.cos(a) * rowH;
        c.mesh.position.y = Math.sin(a) * rowH;
        c.mesh.position.x = leftSideCloudsPos;
        
        this.mesh.add(c.mesh);
    }
    
    //Creation of rigth side clouds
    for(var i = 0; i  < sideCloudsCount; i++)
    {
        var c = new Cloud();
        
        var a = (2 * angle * i) - angle;
        
        c.mesh.position.z = Math.cos(a) * rowH;
        c.mesh.position.y = Math.sin(a) * rowH;
        c.mesh.position.x = rightSideCloudsPos;
        
        this.mesh.add(c.mesh);
    }
}
    