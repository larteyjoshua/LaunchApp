from reportlab.pdfgen import canvas
from datetime import date
from reportlab.platypus import SimpleDocTemplate, Table, Paragraph, TableStyle, Image, Spacer
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, mm
from reportlab.graphics.shapes import Line, Drawing
from datetime import datetime
import calendar
from io import BytesIO


def generateInvoice(companyName, companyLocation, companyEmail, orders, invoiceNo):
    PAGESIZE = (140 * mm, 216 * mm)
    BASE_MARGIN = 5 * mm
    foodCost = sum(cost[3] for cost in orders)
    orders.insert(0,(['Full Name', 'Food Name', 'total Number', 'Cost', 'Ordered Date', 'Location', 'Company Id']))
    total ='Total Cost: ' + str(foodCost)
    discount = 'Discount: ' +  str( (10/100 * foodCost) )
    granTotal = 'Grand Total: '  +  str(foodCost -(10/100 * foodCost)) 
    gridheight =len(orders) 
    gridwidth = len(orders[0])

    today = datetime.today()
    num =today.month
    month =  calendar.month_name[num].upper()

        # creating a Base Document Template of page size A4

   

    pdf_buffer = BytesIO()
    pdf = SimpleDocTemplate( pdf_buffer,
            pagesize=A4,
            topMargin=BASE_MARGIN,
            leftMargin=BASE_MARGIN,
            rightMargin=BASE_MARGIN,
            bottomMargin=BASE_MARGIN )
    styles = getSampleStyleSheet()
   
    elements = []
    logo = "app/resources/images/lunch-icon.png"
    name = 'LunchApp Food Services'
    address1 = "House No RS/APP/0056"
    address2 = "Tema"
    address3 = "Ghana"
    cEmail = "admin@lunchapp.com"
    tell = "Tell: +233 249 64 33 65"
    invoice = "Invoice No: " + str(invoiceNo)

    im = Image(logo, 2*inch, 2*inch)

    style_right =styles['Heading3']
    style_right.alignment = 0

    tbl_data = [
    [Paragraph(name, style_right)],
    [Paragraph(address1, style_right)],
     [Paragraph(address2, style_right)],
       [Paragraph(address3,style_right)],
        [Paragraph(cEmail, style_right)],
        [Paragraph(tell,style_right)],
        [Paragraph(invoice, style_right)],
     
    ]
    tbl = Table(tbl_data)

    tbl_data2 = [
    [im, tbl] ] 

    style1 = TableStyle(
        [
            ( "ALIGN" , ( 0, 0 ), ( -1, -1 ), "LEFT" ), 
        ]
    )

    tb2= Table(tbl_data2,  style = style1)

    elements.append(Spacer(1, 12))
    elements.append(tb2)
    d = Drawing(100, 1)
    d.add(Line(-800, 0, 800, 0))
    elements.append(d)

    elements.append(Spacer(1, 12))

    address_style =styles['Normal']
    address_style.alignment = 0
    customerName =Paragraph("CUSTOMER NAME : " + companyName, address_style)
    customerEmail =Paragraph("CUSTOMER EMAIL : " + companyEmail, address_style)
    customerLocation =Paragraph("CUSTOMER LOCATION : " + companyLocation, address_style)

    elements.append(customerName)
    elements.append(customerEmail)
    elements.append(customerLocation)

    elements.append(Spacer(1, 12))

    title_style = styles[ "Heading2" ]
    
    # 0: left, 1: center, 2: right
    title_style.alignment = 1

    title = Paragraph( "ORDER LIST FOR " + month , title_style )

    elements.append(title)
    
    # creates a Table Style object and in it,
    # defines the styles row wise
    # the tuples which look like coordinates 
    # are nothing but rows and columns
    style = TableStyle(
        [
            ( "BOX" , ( 0, 0 ), ( -1, -1 ), 1 , colors.black ),
            ( "GRID" , ( 0, 0 ), ( gridwidth , gridheight ), 1 , colors.black ),
            ( "BACKGROUND" , ( 0, 0 ), ( gridwidth, 0 ), colors.gray ),
            ( "TEXTCOLOR" , ( 0, 0 ), ( -1, 0 ), colors.whitesmoke ),
            ( "ALIGN" , ( 0, 0 ), ( -1, -1 ), "LEFT" ),
            ( "BACKGROUND" , ( 0 , 1 ) , ( -1 , -1 ), colors.beige ),
        ]
    )
    
    # creates a table object and passes the style to it
    table = Table( orders , style = style )
    elements.append(table)

    gTotal =styles['Heading3']
    gTotal.alignment = 0

    grandTotal =Paragraph(total, gTotal)
    dis = Paragraph(discount, gTotal)
    graTotal = Paragraph(granTotal, gTotal)

    elements.append(grandTotal)
    elements.append(dis)
    elements.append(graTotal)
    print(companyName)
    print(companyLocation)
    print(companyEmail)
    print(orders)
    print(invoiceNo)

    # final step which builds the
    # actual pdf putting together all the elements
    pdf.build(elements)

    pdf_value = pdf_buffer.getvalue()
    pdf_buffer.close()
    return pdf_value

    