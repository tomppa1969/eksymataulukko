let input = document.getElementById( "input" );
let descendents = input.getElementsByTagName( 'input' );

let inputObjects = [];

const EKS1 = 0;
const EKS2 = 1;
const EKS3 = 2;
const EKS4 = 3;
const EKS5 = 4;
const EKS6 = 5;
const EKS7 = 6;
const EKS8 = 7;

let A = 0, B = 0, C = 0, D = 0, E = 0;

let i, e;
for ( i = 0; i < descendents.length; ++i )
{
    e = descendents[ i ];
    e.addEventListener( "input", function ()
    {
        calculateKertoimet();
    } );
    inputObjects.push( e );
}

function el( name )
{
    return document.getElementById( name );
}

function round( value, precision )
{
    var multiplier = Math.pow( 10, precision || 0 );
    return Math.round( value * multiplier ) / multiplier;
}

function calculateKertoimet()
{
    A = kerroinA();
    el( 'A' ).innerText = round( A, 1 );
    B = kerroinB();
    el( 'B' ).innerText = round( B, 1 );
    C = kerroinC();
    el( 'C' ).innerText = round( C, 1 );
    D = kerroinD();
    el( 'D' ).innerText = round( D, 1 );
    E = kerroinE();
    el( 'E' ).innerText = round( E, 1 );
    eksymaTaulukko();
}

function getFloat( invalue )
{
    if ( !isNaN( invalue ) && !isNaN( parseFloat( invalue ) ) )
    {
        return parseFloat( invalue );
    }
    return 0;
}

// ( eks1 + eks2 + eks3 + eks4 + eks5 + eks6 + eks7 + eks8 )/ 8
function kerroinA()
{
    let sum = 0.0;
    inputObjects.forEach( obj =>
    {
        sum += getFloat( obj.value );
    } );
    return sum / inputObjects.length;
}

// ( eks2 + eks3 + eks4 - eks6 - eks7 - eks8 ) / ( 2 + 2 * NELIÖJUURI(2) )
function kerroinB()
{
    let sum = getFloat( inputObjects[ EKS2 ].value );
    sum += getFloat( inputObjects[ EKS3 ].value );
    sum += getFloat( inputObjects[ EKS4 ].value );
    sum -= getFloat( inputObjects[ EKS6 ].value );
    sum -= getFloat( inputObjects[ EKS7 ].value );
    sum -= getFloat( inputObjects[ EKS8 ].value );

    return sum / (2 + 2 * Math.sqrt( 2 ));
}

// ( eks1 + eks2 - eks4 - eks5 - eks6 + eks8 ) / ( 2 + 2 * NELIÖJUURI(2) )
function kerroinC()
{
    let sum = getFloat( inputObjects[ EKS1 ].value );
    sum += getFloat( inputObjects[ EKS2 ].value );
    sum -= getFloat( inputObjects[ EKS4 ].value );
    sum -= getFloat( inputObjects[ EKS5 ].value );
    sum -= getFloat( inputObjects[ EKS6 ].value );
    sum += getFloat( inputObjects[ EKS8 ].value );

    return sum / (2 + 2 * Math.sqrt( 2 ));
}

//  eks2 - eks4 + eks6 - eks8 ) / 4
function kerroinD()
{
    let sum = getFloat( inputObjects[ EKS2 ].value );
    sum -= getFloat( inputObjects[ EKS4 ].value );
    sum += getFloat( inputObjects[ EKS6 ].value );
    sum -= getFloat( inputObjects[ EKS8 ].value );

    return sum / 4;
}

// ( eks1 - eks3 + eks5 - eks7 ) / 4
function kerroinE()
{
    let sum = getFloat( inputObjects[ EKS1 ].value );
    sum -= getFloat( inputObjects[ EKS3 ].value );
    sum += getFloat( inputObjects[ EKS5 ].value );
    sum -= getFloat( inputObjects[ EKS7 ].value );

    return sum / 4;
}

// eksymä = A + B * sin(KS) + C * cos(KS) + D * sin(2 * KS) + E * cos(2 * KS)
function getEksyma( KS )
{
    return round( A + B * Math.sin( KS ) + C * Math.cos( KS ) + D * Math.sin( 2 * KS ) + E * Math.cos( 2 * KS ), 0 );
}

function eksymaTaulukkoArvotNaytolle( arvo )
{
    const MASK = "000";
    let res = MASK.substr( 0, MASK.length - arvo.length ) + arvo;
    return res;
}

function eksymaTaulukko()
{
    let specific_tbody = el( "taulukko" );
    specific_tbody.style.visibility="visible";
    specific_tbody.style.display="table";
    specific_tbody.style.padding= "10px";
    specific_tbody.style.backgroundColor="white";
    specific_tbody.style.width= "300px";
    specific_tbody.style.borderStyle= "solid";
    specific_tbody.style.borderWidth= "3px";
    specific_tbody.style.borderColor= "black";
    el("tulostus").style.visibility = "visible";
    specific_tbody.innerHTML = "";
    specific_tbody.innerHTML = "<div id=\"otsikko\" style=\"display: table-row\"><label style=\"display: table-cell\">KS</label><label style=\"display: table-cell\">eks</label><label\n" +
        "    style=\"display: table-cell\"\n" +
        ">MS</label></div>";
    let i;
    for ( i = 0; i < 36; i++ )
    {
        let kurssi = (i * 10);
        let eksyma = getEksyma( kurssi );
        let magSuunta = kurssi + eksyma;
        specific_tbody.innerHTML +=
            "<div id=\"rivi\" style=\"display: table-row\">" +
            "<label style=\"display: table-cell;border-top-style: solid;border-top-width: 1px;border-top-color: black;\">"
            + eksymaTaulukkoArvotNaytolle( kurssi.toString() ) +
            "°</label><label style=\"display: table-cell;border-top-style: solid;border-top-width: 1px;border-top-color: black;\">" +
            eksyma.toString() +
            "°</label><label style=\"display: table-cell;border-top-style: solid;border-top-width: 1px;border-top-color: black;\">"
            + eksymaTaulukkoArvotNaytolle(magSuunta.toString()) +
            "°</label></div>"
    }
}

function print(elem)
{
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    let dd = document.getElementById(elem);
    console.log(dd);
    console.log(dd.innerHTML);

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}
