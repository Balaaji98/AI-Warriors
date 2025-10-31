from fastapi import APIRouter, Depends, Response
from sqlmodel import select
from app.db.session import get_session
from app.models import Item
import csv, io
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet

router = APIRouter(prefix='/export', tags=['export'])

@router.get('/csv')
def export_csv(session=Depends(get_session)):
    items = session.exec(select(Item)).all()
    buf = io.StringIO()
    writer = csv.writer(buf)
    writer.writerow(['sku','name','quantity','unit_cost','total_value','category'])
    for it in items:
        writer.writerow([it.sku, it.name, it.quantity, it.unit_cost, it.total_value, it.category])
    return Response(content=buf.getvalue(), media_type='text/csv', headers={
        'Content-Disposition': 'attachment; filename=inventory.csv'
    })

@router.get('/pdf')
def export_pdf(session=Depends(get_session)):
    items = session.exec(select(Item)).all()
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []
    elements.append(Paragraph('Inventory ABC Classification', styles['Title']))
    elements.append(Spacer(1,12))
    data = [['SKU','Name','Qty','Unit Cost','Total Value','Category']]
    for it in items:
        data.append([it.sku, it.name, str(it.quantity), f"{it.unit_cost}", f"{it.total_value}", it.category or ''])
    table = Table(data, colWidths=[60,150,40,60,60,40])
    table.setStyle(TableStyle([('GRID',(0,0),(-1,-1),0.5,colors.grey), ('BACKGROUND', (0,0), (-1,0), colors.lightblue)]))
    elements.append(table)
    doc.build(elements)
    buffer.seek(0)
    return Response(content=buffer.read(), media_type='application/pdf', headers={
        'Content-Disposition':'attachment; filename=inventory.pdf'
    })
