def subset_sum(numbers, target, total, partial=[]):
    s = sum(partial)
    
    if s == target:
        total.append(partial)
        return total

    if s >= target:
        return 
    
    for i in range(len(numbers)):
        n = numbers[i]
        remaining = numbers[i+1:]
        subset_sum(remaining, target, total, partial + [n]) 

def verify_result(total):
    if len(total) == 0:
        return "IMPOSSIBLE"
    for j in range(len(total)):
        if len(set(map(len, total))) <= 1:
            return len(total[j])
        else:
            return "AMBIGUOUS"
 
cases = int(input())
while cases > 0:
    total = []
    itens_amount = input()
    temp_amount_list = itens_amount.split()
    total_itens = int(temp_amount_list[0])
    stolen_amount = int(temp_amount_list[1])
    weight_list = input()
    temp_list = weight_list.split()
    hval = [eval(i) for i in temp_list]

    subset_sum(hval, stolen_amount, total)
    print(verify_result(total))
    cases = cases - 1