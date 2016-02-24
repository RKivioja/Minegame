/**
 * Scripti, joka luo miinapelin käyttäjän antamien asetusten mukaan.
 * @author Roope Kivioja
 * @date 29.09.2015
 */

/**
 * Ikkunan onload-tapahtumat.
 */
window.onload = function()
{
	luo_valikko();
	aseta_tyylit();
	
	var luo = document.getElementById("luonappi");
	
	luo.setAttribute("type", "button");
	luo.onclick = luo_ruudukko;
}

/**
 * Luo miinakentän ja sen alaiset elementit.
 */
function luo_ruudukko()
{
	var html = document.childNodes[2];
	var body = html.lastChild;
	var table = body.childNodes[7];
	
	while (table.firstChild)
	{
	    table.removeChild(table.firstChild);
	}
	
	var leveys = document.getElementsByName("x")[0].value;
	if(leveys > 32) leveys = 32;
	
	var pommit = document.getElementsByName("pommit")[0].value;
	if(pommit > leveys*leveys) pommit = leveys*leveys;
	
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	
	var todennakoisyys = pommit;
	var koko = leveys * leveys;
	
	var pelipaattyi = false;
	
	for(var i = 0; i < leveys; i++)
	{
		var tr = document.createElement("tr");
		tbody.appendChild(tr);
		
		for(var j = 0; j < leveys; j++)
		{		
			var td = document.createElement("td");
			td.setAttribute("name", "ruutu");
			tr.appendChild(td);
			var rand = Math.floor((Math.random() * koko) + 1);
			if( rand < 0) rand = 0;
			
			if((rand > todennakoisyys) && (koko > todennakoisyys))
			{
				var span = document.createElement("span");
				span.setAttribute("id", "tyhja" + i + j);
				
				span.addEventListener("click", function(evt)
				{
					if(pelipaattyi) return;
					
				    var tyhja = document.getElementById(evt.target.id);
				    
				    var img = document.createElement("img");
					img.setAttribute("src", "tyhja.png");
					img.setAttribute("alt", "tyhja");
					img.style.display="block";
					img.style.height = "50px";
					img.style.width = "50px";
					
					tyhja.parentNode.appendChild(img);
					
				    tyhja.parentNode.removeChild(tyhja);
				});
				
				td.appendChild(span);
				koko--;
			} 
			else
			{
				var span = document.createElement("span");
				span.setAttribute("id", "pommi" + i + j);
				span.setAttribute("name", "pommi");
				
				span.addEventListener("click", function(evt)
				{
				    var kaikkipommit;
				    kaikkipommit = document.getElementsByName("pommi");
				    
				    for(var n = kaikkipommit.length - 1; n >= 0; n--)
				    {
				    	var img = document.createElement("img");
						img.setAttribute("alt", "pommi");
						img.setAttribute("id", "pommi"+n);
						img.setAttribute("src", "mine.svg");
						img.style.display="block";
						img.style.height = "50px";
						img.style.width = "50px";
						
						kaikkipommit[n].parentNode.appendChild(img);
					    kaikkipommit[n].parentNode.removeChild(kaikkipommit[n]);
					    
					    pelipaattyi = true;
				    }
				    
				});
				
				td.appendChild(span);
				
				todennakoisyys--;
				koko--;
				if(todennakoisyys < 0) todennakoisyys = 0;
			}
			
		}
	}
	aseta_tyylit();
}

/**
 * Luo valikon, jossa kysytään ruudukon koko ja pommien määrä käyttäjältä.
 */
function luo_valikko()
{
	var valikko = document.getElementById("ruudukko");
	
	var fieldset1=document.createElement('fieldset');
	valikko.appendChild(fieldset1);
	
	var p1 = document.createElement('p');
	fieldset1.appendChild(p1);
	
	var label1 = document.createElement('label');
	p1.appendChild(label1);
	
	var txt2 = document.createTextNode('Leveys ');
	label1.appendChild(txt2);
	
	var input1 = ce('input','x');
	input1.setAttribute('type','text');
	input1.setAttribute('value','8');
	label1.appendChild(input1);
	
	var p2 = document.createElement('p');
	fieldset1.appendChild(p2);
	
	var label2 = document.createElement('label');
	p2.appendChild(label2);
	
	var txt4 = document.createTextNode('Pommit ');
	label2.appendChild(txt4);
	
	var input2 = ce('input','pommit');
	input2.setAttribute('type','text');
	input2.setAttribute('value','4');
	label2.appendChild(input2);
	
	var p3 = document.createElement('p');
	fieldset1.appendChild(p3);
	
	var input3 = document.createElement('input');
	input3.setAttribute("type", "button");
	input3.setAttribute('value','Luo');
	input3.setAttribute("id", "luonappi");
	p3.appendChild(input3);
}


/***
 * Kiinnittää tagin elementtiin
 * @param tag kiinnitettävä tag
 * @param name elementin nimi
 * @returns kokonainen elementti
 */
function ce(tag, name)
{
	  var element;
	  
	  if (name && window.ActiveXObject)
	  {
	    element = document.createElement('<'+tag+' name="'+name+'">');
	  }
	  else
	  {
	    element = document.createElement(tag);
	    element.setAttribute('name',name);
	  }
	  return element;
}

/**
 * Asettaa HTML-tiedoston tyylit.
 */
function aseta_tyylit()
{
	
	var tdt = document.getElementsByTagName("TD");
	
	for(var i = 0; i < tdt.length; i++)
	{
		tdt[i].style.margin = "0px";
		tdt[i].style.padding = "0px";
		tdt[i].style.border = "0px solid silver";
		tdt[i].style.textAlign = "center";
		tdt[i].style.verticalAlign = "top";
		tdt[i].style.backgroundColor = "white";
	}
	
    var tdt = document.getElementsByTagName("TABLE");
	
	for(var i = 0; i < tdt.length; i++)
	{
		tdt[i].style.border = "1px solid black";
		tdt[i].style.borderSpacing = "0";
		tdt[i].style.borderCollapse = "collapse";
	}
	
	var spanit = document.getElementsByTagName("SPAN");
	
	for(var i = 0; i < spanit.length; i++)
	{
		spanit[i].style.border = "4px groove silver";
		spanit[i].style.minWidth = "50px";
		spanit[i].style.minHeight = "50px";
		spanit[i].style.margin = "0px";
		spanit[i].style.padding = "0px";
		spanit[i].style.backgroundColor = "silver";
		spanit[i].style.display = "block";
	}
	
	var imget = document.getElementsByTagName("IMG");
	
	for(var i = 0; i < imget.length; i++)
	{
		imget[i].style.marginTop = "-10px";
		imget[i].style.padding = "10px";
		imget[i].style.marginBottom = "-15px";
		imget[i].style.minWidth = "50px";
		imget[i].style.minHeight = "50px";
	}
}