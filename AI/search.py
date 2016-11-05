
def binary_search(p,n):
	p.sort()
	#print p
	floor = 0
	roof = len(p)
	#loop_counter = 0
	while True:
		#loop_counter +=1
		#print "loop ", loop_counter
		mid = floor + (roof-floor)/2
		if p[mid] < n:
			floor = mid +1
		if p[mid] > n:
			roof = mid-1
		if p[mid] == n:
			return mid,n
	return None, None

def linear_search(p,n):
	for x in xrange(0,len(p)):
		if (p[x]==n):
			return x,n
	return None,None

def main():
	pile = [1,9,5,3,8,2,0,7,6]
	needle = 7
	#x,n = linear_search(pile, needle)
	x,n = binary_search(pile, needle)
	
	if ((x,n) != (None,None)):
		print "found " ,n, " at ",x+1
	else:
		print "not found"
	return

if __name__ == '__main__':
	main()

