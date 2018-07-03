if(!localStorage.getItem("products")){
	localStorage.setItem("products",JSON.stringify([
	{pid:1,pname:"Rice",price:38},
	{pid:2,pname:"Sugar",price:44},
	{pid:3,pname:"Coconut Oil",price:120},
	{pid:4,pname:"Sunflower Oil",price:80},
	{pid:5,pname:"Pen",price:5},
	{pid:6,pname:"Biscuite",price:20},
	{pid:7,pname:"Colgate",price:30},
	]));
}
var plen=0;

$(document).ready(function(){
	var products=JSON.parse(localStorage.getItem("products"));
	plen=products.length;
	var sno=0;
	var tb=$("#tbody");
	for(var i=0;i<plen;i++){
		if(products[i]){
			tb.add("<tr><td>"+selectCheck(products[i].pid)+"</td><td>"+(sno+1)+"</td><td id='n"+products[i].pid+"'>"+products[i].pname+"</td><td id='p"+products[i].pid+"'>"+products[i].price+"</td><td>"+txtQuantity(products[i].pid)+"</td><td id='t"+products[i].pid+"'>"+(products[i].price)+"</td><td><a id='view-icon' class='action-icon' onclick='pview("+products[i].pid+")'><i class='fa fa-eye'></i></a><a class='action-icon' onclick='edit("+products[i].pid+")'><i class='fa fa-pencil'></i></a><a onclick='pdelete("+products[i].pid+")' class='action-icon'><i class='fa fa-trash-o'></i></a></td></tr>").appendTo("#tbody");
			sno++;
		}
	}
});

function selectCheck(id){
	return '<input type="checkbox" name="c'+id+'" class="chkbx-table" id="c'+id+'">';
}

function txtQuantity(id){
	return '<input type="number" name="quantity" id="q'+id+'" value="1" min="0" onblur="quantity(this,'+id+')">';
}

function quantity(obj,id){
	var products=JSON.parse(localStorage.getItem("products"));
	var qty=Number(obj.value);
	var product=searchObj(id);
	$("#t"+id).html(""+(product.price*qty));
}

function searchObj(id){
	var products=JSON.parse(localStorage.getItem("products"));
	plen=products.length;
	for(var i=0;i<plen;i++){
		if(products[i]){
			if(products[i].pid==id){
				return products[i];
			}
		}
	}
	console.log(products);
}

function searchObjIndex(id){
	var products=JSON.parse(localStorage.getItem("products"));
	plen=products.length;
	for(var i=0;i<plen;i++){
		if(products[i]){
			if(products[i].pid==id){
				return i;
			}
		}
	}
}

function pdelete(id){
	var products=JSON.parse(localStorage.getItem("products"));
	var a=window.confirm("If you want to delete \n this Product ???"+id);
	 if(a==true){
			var s=searchObjIndex(id);
			delete products[s];
			alert("Success");
			localStorage.setItem("products",JSON.stringify(products));
			window.location.reload();
	}
	else{
		alert("Failed Product Delete");
	}
}

function edit(id){
	$('.edit').css("display","block"); 
	var product=searchObj(id);
	document.forms.editForm.name.value=""+product.pname;
	document.forms.editForm.price.value=product.price;
	document.forms.editForm.id.value=product.pid;
}

function  pview(id){     
	$('.view').css("display","block"); 
	var product=searchObj(id);
	$('#view-name').html(""+product.pname);
	$('#view-price').html(""+product.price);
}

function add(){
	$('.add').css("display","block");
}

function viewEdit(){
	$('.view').css("display","none"); 
	$('.edit').css("display","block"); 
}
function viewClose(){
	$('.view').css("display","none"); 
}

function editSave(){
	var products=JSON.parse(localStorage.getItem("products"));
	var id=document.forms.editForm.id.value;
	var index=searchObjIndex(id);
	products[index].pname=document.forms.editForm.name.value;
	products[index].price=document.forms.editForm.price.value;
	localStorage.setItem("products",JSON.stringify(products));
	alert("Successfully Saved");
	$('.edit').css("display","none"); 
	window.location.reload();
}
function editCancel(){
	$('.edit').css("display","none"); 
}

function addSave(){
	var products=JSON.parse(localStorage.getItem("products"));
	var name=document.forms.addForm.name.value;
	var price=document.forms.addForm.price.value;
	var product={pid: null,pname: null,price: null};
	var len=products.length;
	var chk=len-1;
	var id=null;
	while(products[chk] == null && chk>=0){
		chk--;
	}
	if(chk >= 0){
		id=products[chk].pid+1;
	}
	else{
		id=1;
	}
	product.pid=id;
	product.pname=name;
	product.price=price;
	products[len]=product;
	localStorage.setItem("products",JSON.stringify(products));
	alert("Successfully Saved");
	$('.add').css("display","none"); 
	window.location.reload();
}
function addCancel(){
	$('.add').css("display","none"); 
}

function selectView(){
	var products=JSON.parse(localStorage.getItem("products"));
	plen=products.length;
	var sno=0;
	var tb=$("#select-view-tbody");
	var checkDisplay=false;
	for(var i=0;i<plen;i++){
		if(products[i]){
			var checkboxObj=document.getElementById('c'+products[i].pid);
			var id=Number(document.getElementById('c'+products[i].pid).id.slice(1));
			var index = searchObjIndex(id);
			if(checkboxObj.checked == true){
				tb.add("<tr class='select-view-row'><td>"+(sno+1)+"</td><td>"+products[index].pname+"</td><td>"+products[index].price+"</td></tr>").appendTo("#select-view-tbody");
				checkDisplay=true;
			}
		}
	}
	if(checkDisplay==true){
		$('.view-list').css("display","block"); 	
	}
	else{
		alert("Please select Row to view !!!!");
	}
}

function selectViewClose(){
	$('.view-list').css("display","none"); 
	$('.select-view-row').remove(); 
}

function selectDelete(){
	var products=JSON.parse(localStorage.getItem("products"));
	plen=products.length;
	var checkDisplay=false;
	for(var i=0;i<plen;i++){
		if(products[i]){
			var checkboxObj=document.getElementById('c'+products[i].pid);
			var id=Number(document.getElementById('c'+products[i].pid).id.slice(1));
			var index = searchObjIndex(id);
			if(checkboxObj.checked == true){
				delete products[index];
				checkDisplay=true;
			}
		}
	}
	if(checkDisplay==true){
		localStorage.setItem("products",JSON.stringify(products));
		alert("Successfully Deleted Selected Items...");
		window.location.reload();
	}
	else{
		alert("Please select row to delete !!!!");
	}
}