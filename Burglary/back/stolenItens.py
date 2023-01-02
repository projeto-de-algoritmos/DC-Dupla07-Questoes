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