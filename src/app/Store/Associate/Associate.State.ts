import { AssociateModel } from "../Model/Associate.model";

export const AssociateState:AssociateModel={
    list:[],
    errormessage:'',
    associateobj:{
        id: 0,
        name: "",
        email: "",
        phone: "",
        type: "CUSTOMER",
        address: "",
        associategroup: "level1",
        status: true
    },
    pagination:{
        pageIndex:0,
        totalItem:20,
        pageSize:5,
        pageSizeoption:[5,10,25],
    }
}