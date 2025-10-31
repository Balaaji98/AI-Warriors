from typing import List, Optional
from app.models import Item, Thresholds

def compute_total_values(items: List[Item]):
    for i in items:
        i.total_value = i.quantity * i.unit_cost
    return items

def abc_classify(items: List[Item], thresholds: Optional[Thresholds] = None) -> List[Item]:
    if thresholds is None:
        a_cut = 0.7
        b_cut = 0.9
    else:
        a_cut = thresholds.a_cutoff
        b_cut = thresholds.b_cutoff

    # compute and sort
    for it in items:
        it.total_value = it.quantity * it.unit_cost
    items_sorted = sorted(items, key=lambda x: x.total_value, reverse=True)
    total = sum(it.total_value for it in items_sorted) or 1.0
    cum = 0.0
    for it in items_sorted:
        contrib = it.total_value / total
        cum += contrib
        if cum <= a_cut:
            it.category = 'A'
        elif cum <= b_cut:
            it.category = 'B'
        else:
            it.category = 'C'
    # return items with categories (original order)
    id_map = {it.id: it for it in items_sorted if it.id is not None}
    return [id_map.get(it.id, it) if it.id is not None else it for it in items]
