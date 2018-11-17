/*
function displayInfo(args) {
    var output = "";
    if(typeof args.name == "string")
    {
        output +="Name: " +args.name +"\n";
    }
    if(typeof args.age == "number")
    {
        output +="Age: "+args.age +"\n";
    }
    alert(output);


}
displayInfo({
        name: "Nico",
        age : 18
    });
displayInfo({
        name: "Grey"
});*/
function Person(name) {
    this.name = name;
}
function mother() {

}
mother.prototype = {
    age:18,
    home:["Beijing","Shanghai"]
}
Person.prototype = new mother();//person的原型为mother
var p1 = new Person("Jack");
var p2 = new Person("Tom");
p1.age =19;
p1.home[0] = 'Shenzheng';
p1.home=["Guangzhou","Hangzhou"];
delete p1.age;
Person.prototype.lastName = "Jin";
Person.prototype ={age:28,address:{country:"USA",city:"Washington"}};
var p3 = new Person("Obama");
mother.prototype.no = 9527;
mother.prototype = {car:2,hobby:['run','jump']};
var p4 =new Person("Tony");
Person.prototype = new mother();
var p5 = new Person("T");
alert(p1.name+"\n"+p1.home+"\n"+p1.age+"\n"+p1.lastName+p1.no);
alert(p2.name+"\n"+p2.home+"\n"+p2.age+"\n"+p2.lastName+p1.no);
alert(p3.name+"\n"+p3.age+"\n"+p3.address.country);
alert(p5.name+"\n"+p5.car+"\n"+p5.hobby);