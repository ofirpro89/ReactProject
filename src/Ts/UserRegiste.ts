type Tuser = {
    name:{
        first:string;
        middle:string;
        last:string;

},
_id:string;
phone:string;
email:string;
address:{
state:string;
country:string;
city:string;
street:string;
houseNumber:number;
zip:number;
},
image:{
    url:string;
    alt:string;
}
password:string;
isBusiness:boolean;
isAdmin:boolean;
}

export default Tuser