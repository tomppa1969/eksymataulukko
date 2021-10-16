const Utils = {

    CHART_COLORS: {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)',
        black: 'rgb(0,0,0)'
    }
};

let eksymaKayraCanvas = 0

const eksymaKayraCanvasConfig = {
    type: 'line',
    options: {
        indexAxis: 'y',
        tension: .0,
        //pointRadius:1,
        stepped: false,
        responsive: true,
        drawTicks: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart'
            }
        },

        scales: {

            x: {
                display: true,
                title: {
                    display: true
                },
                min: -10,
                max: 10,
                start: -10,
                end: 10,
                ticks: {

                    callback: function ( value, index, values )
                    {
                        return value + '°';
                    },
                    stepSize: 1,
                    autoSkip: false

                },
                grid: {
                    drawBorder: true,
                    lineWidth: function ( context )
                    {
                        if ( context.tick.value === 0 )
                        {
                            return 2;
                        }
                        return 1;
                    },
                    color: function ( context )
                    {
                        if ( context.tick.value === 0 )
                        {
                            return Utils.CHART_COLORS.black;
                        }
                        return Utils.CHART_COLORS.grey;
                    }
                }

            },
            y: {
                ticks: {
                    callback: function ( value, index, values )
                    {
                        let _value = (value * 10).toString();
                        return eksymaTaulukkoArvotNaytolle( _value ) + '°'
                    }
                },
                grid: {
                    drawBorder: true,
                    color: function ( context )
                    {
                        return Utils.CHART_COLORS.grey;
                    }
                }
            }
        }
    }

};

function eksymaTaulukkoArvotNaytolle( arvo )
{
    const MASK = "000";
    let res = MASK.substr( 0, MASK.length - arvo.length ) + arvo;
    return res;
}

function setTableHead( specific_tbody )
{
    specific_tbody.style.visibility = "visible";
    specific_tbody.style.display = "table";
    specific_tbody.style.padding = "10px";
    specific_tbody.style.backgroundColor = "white";
    specific_tbody.style.width = "300px";
    specific_tbody.style.borderStyle = "solid";
    specific_tbody.style.borderWidth = "3px";
    specific_tbody.style.borderColor = "black";
    el( "tulostus1" ).style.visibility = "visible";
    el( "tulostus2" ).style.visibility = "visible";
    specific_tbody.innerHTML = "";
    specific_tbody.innerHTML = "<div id=\"otsikko\" style=\"display: table-row\"><label style=\"display: table-cell\">KS</label><label style=\"display: table-cell\">eks</label><label\n" +
        "    style=\"display: table-cell\"\n" +
        ">MS</label></div>";
}

function getDataObject()
{
    return {
        labels: [],
        datasets: [
            {
                label: 'Eksymat',
                showLine: true,
                backgroundColor: Utils.CHART_COLORS.blue,
                borderColor: Utils.CHART_COLORS.blue,
                data: []
            }
        ]
    };
}

function drawEksymaCanvas( data )
{
    let ctx = document.getElementById( 'kayra' ).getContext( '2d' );
    eksymaKayraCanvasConfig.data = data
    if ( eksymaKayraCanvas )
    {
        eksymaKayraCanvas.destroy();
    }
    eksymaKayraCanvas = new Chart( ctx, eksymaKayraCanvasConfig )
}

function eksymaTaulukko()
{
    let specific_tbody = el( "taulukko" );
    setTableHead( specific_tbody );

    let data = getDataObject();

    let i;
    for ( i = 0; i < 36; i++ )
    {
        let kurssi = i * 10;
        let eksyma = getEksyma( kurssi );
        let laskentaKurssi = (kurssi + eksyma) <= 0 ? 360 : kurssi;
        let magSuunta = laskentaKurssi + eksyma;
        let s_kurssi = eksymaTaulukkoArvotNaytolle( kurssi.toString() );
        specific_tbody.innerHTML +=
            getLine( s_kurssi, eksyma, magSuunta )
        eksyma = getEksyma( kurssi, false )
        data.datasets[ 0 ].data.push( eksyma )
        data.labels.push( kurssi )
    }
    drawEksymaCanvas( data );

}

function getLine( kurssi, eksyma, magSuunta )
{
    return "<div id=\"rivi\" style=\"display: table-row\">" +
        "<label style=\"display: table-cell;border-top-style: solid;border-top-width: 1px;border-top-color: black;\">"
        + kurssi +
        "°</label><label style=\"display: table-cell;border-top-style: solid;border-top-width: 1px;border-top-color: black;\">" +
        eksyma.toString() +
        "°</label><label style=\"display: table-cell;border-top-style: solid;border-top-width: 1px;border-top-color: black;\">"
        + eksymaTaulukkoArvotNaytolle( magSuunta.toString() ) +
        "°</label></div>";
}

function printTaulukko( elem )
{
    var mywindow = window.open( '', 'PRINT', 'height=400,width=600' );

    mywindow.document.write( '<html><head><title>' + document.title + '</title>' );
    mywindow.document.write( '</head><body >' );
    mywindow.document.write( '<h1>' + document.title + '</h1>' );
    mywindow.document.write( document.getElementById( elem ).innerHTML );
    mywindow.document.write( '</body></html>' );

    mywindow.document.close();
    mywindow.focus();

    mywindow.print();
    mywindow.close();

    return true;
}

function printCanvas( elem )
{
    var dataUrl = document.getElementById( elem ).toDataURL(); //attempt to save base64 string to server using this var
    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body>'
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';
    var printWin = window.open( '', '', 'width=550,height=400' );
    printWin.document.open();
    printWin.document.write( windowContent );

    printWin.document.addEventListener( 'load', function ()
    {
        printWin.focus();
        printWin.print();
        printWin.document.close();
        printWin.close();
    }, true );
}
