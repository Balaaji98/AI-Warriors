from app.services.classifier import abc_classify
from app.models import Item, Thresholds

def test_abc_classify():
    items = [Item(id=1, sku='s1', name='A', quantity=10, unit_cost=100),
             Item(id=2, sku='s2', name='B', quantity=50, unit_cost=5),
             Item(id=3, sku='s3', name='C', quantity=200, unit_cost=1)]
    th = Thresholds(a_cutoff=0.7, b_cutoff=0.9)
    res = abc_classify(items, th)
    cats = [r.category for r in res]
    assert 'A' in cats and 'B' in cats and 'C' in cats
