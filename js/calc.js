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

function sin( v )
{
    return Math.sin( v * (Math.PI / 180) )
}

function cos( v )
{
    return Math.cos( v * (Math.PI / 180) )
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
function getEksyma( KS, _round = true )
{
    if ( _round )
    {
        return round( A + B * sin( KS ) + C * cos( KS ) + D * sin( 2 * KS ) + E * cos( 2 * KS ), 0 );
    }

    return A + B * sin( KS ) + C * cos( KS ) + D * sin( 2 * KS ) + E * cos( 2 * KS );
}
