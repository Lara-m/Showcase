import copy

def bfs(graph,start,goal):
	Q = []
	path = []
	Q.append(start)
	path.append([start])

	while len(Q)>0:
		print "queue: ",Q
		top = Q[0]
		current = graph[top]
		for node in current:
			if node not in Q:
				Q.append(node)
			for p in path:
				if p[len(p)-1] == top:
					temp = copy.copy(p)
					temp.append(node)
					path.append(temp)
			if node == goal:
				print "found it"
		Q.remove(top)
	true_path=[]
	for p in path:
		if p[len(p)-1] == goal:
			true_path.append(p)
	return true_path

def main():
	graph = {
		'A': ['B', 'C','H'],
		'B': ['C', 'D','I'],
		'C': ['F','J'],
		'D': ['E'],
		'E': ['G'],
		'F': [],
		'G': [],
		'H': [],
		'I': [],
		'J': ['G'],
		}
	path = bfs(graph,'A','G')
	print "path: ",path

if __name__ == '__main__':
	main()