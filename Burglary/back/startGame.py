import random
from stolenItens import subset_sum

def start_game(total_itens):
    total = []
    total_itens = int(total_itens)
    stolen_amount = random.randint(1, 300)
    hval = []

    for i in range(total_itens):
        number = random.randint(1,60)
        hval.append(number)

    while sum(hval) < stolen_amount:
        stolen_amount = random.randint(1, 300)

    subset_sum(hval, stolen_amount, total)

    l = [len(i) for i in total]
    final_list = [total, l, stolen_amount, hval]

    if len(total) == 0:
        final_list = [[0], [0], stolen_amount, hval]

    return final_list