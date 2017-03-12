import copy

def dfs(A, head,stack):
	if len(A[head])<1 :
		return None
	for child in A[head]:
		#print child
		for i in stack:
			if i[-1] == head:
				stack.append(copy.copy(i)+child);
		dfs(A,child, stack)
	return
	
if __name__ == '__main__':
	A = {
	"A": ["B" , "C"],
	"B": [],
	"C": ["D" , "E"],
	"D": ["F"],
	"E": [],
	"F": []
	}
	stack = []
	stack.append("A")
	print A
	dfs(A,"A",stack)
	print "All routes:", stack
	print "Paths:", 
	for i in stack:
		if i[-1] == "F":
			print i,

	print ""
