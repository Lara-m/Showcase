import sys, os
from xml.etree.ElementTree import Element, SubElement, tostring
from xml.dom.minidom import parse, parseString
from urllib2 import Request, urlopen, URLError

##Obtains the collection of works from URL
def get_col(URL):
	request = Request(URL)
	try:
		response = urlopen(request)
		chunk = response.read()
	except URLError, e:
		print 'Error code:', e
	collection = parseString(chunk).documentElement
	##Checking if there are any works
	##This section could be changed to redirect to a different page if API was not responding.
	assert (collection.getElementsByTagName("work")>0)
	return collection

##Finds all "make"s in works
def get_makes(collection):
	cam_make = []
	for x in xrange(0,len(collection.getElementsByTagName("make"))):
		if collection.getElementsByTagName("make")[x].firstChild.nodeValue not in cam_make:
			cam_make.append(collection.getElementsByTagName("make")[x].firstChild.nodeValue)
	return cam_make

##Creates index page
def index_page(collection,Output_Directory):
	root = Element('html')
	head = SubElement(root, 'head')
	title = SubElement(head, 'title')
	title.text = 'Index'
	body = SubElement(root, 'body')
	number_of_urls=28
	if (len(collection.getElementsByTagName('url')) -1 < number_of_urls):
		number_of_urls = len(collection.getElementsByTagName('url')) -1

	for x in xrange(0,number_of_urls):
		if (x%3==0):
			div = SubElement(body, 'div')
			p = SubElement(div, 'p')
			image = SubElement(div, 'img').set('src',
				collection.getElementsByTagName('url')[x].firstChild.nodeValue)
	cam_make = get_makes(collection)
	assert(len(cam_make)>0)
	nav = SubElement(body, 'nav')
	for x in xrange(0,len(cam_make)):
		a = SubElement(nav, 'a')
		a.set('href','make'+str(cam_make[x])+'.html')
		a.text = cam_make[x]
		p = SubElement(a, 'p')
	#Saving to HTML file
	htmlfile = open(Output_Directory+'index.html','w+')
	htmlfile.write(tostring(root))
	htmlfile.close()
	return

##Finds the "model"s for each "make" in works
def get_models(works, mk):
	models = []
	for work in works:
		if len(work.getElementsByTagName("make"))>0:
			if (mk == work.getElementsByTagName("make")[0].firstChild.nodeValue):
				if work.getElementsByTagName('model')[0].firstChild.nodeValue not in models:
					models.append(work.getElementsByTagName('model')[0].firstChild.nodeValue)
	return models

##Creates "make" pages
def make_pages(collection,Output_Directory):
	cam_make = get_makes(collection)
	assert(len(cam_make)>0)
	works =collection.getElementsByTagName("work")
	for x in xrange(len(cam_make)):
		root = Element('html')
		head = SubElement(root, 'head')
		body = SubElement(root, 'body')
		title = SubElement (body,'text')
		title.text=cam_make[x]

		for work in works:
			if len(work.getElementsByTagName("make"))>0:
				if (cam_make[x]== work.getElementsByTagName("make")[0].firstChild.nodeValue):
					div = SubElement(body, 'div')
					p = SubElement(div, 'p')
					image = SubElement(div, 'img').set('src',
						work.getElementsByTagName('url')[0].firstChild.nodeValue)
		
		nav = SubElement(body, 'nav')
		a = SubElement(nav, 'a')
		a.set('href','index.html')
		a.text = "Index Page"
		p = SubElement(nav, 'p')
		models = get_models(works, cam_make[x])
		if len(models)>0:
			for y in xrange(0,len(models)):
				a = SubElement(nav, 'a')
				a.set('href','model'+str(models[y])+'.html')
				a.text = models[y]
				p = SubElement(nav, 'p')

		#Saving to HTML file
		htmlfile = open(Output_Directory+'make'+str(cam_make[x])+'.html','w+')
		htmlfile.write(tostring(root))
		htmlfile.close()
	return

##Finds all "model"s in works
def get_all_models(collection):
	cam_mod = []
	model_elems = collection.getElementsByTagName("model")
	cam_mod.append(model_elems[0].firstChild.nodeValue)
	for x in xrange(0,len(model_elems)):
		if model_elems[x].firstChild.nodeValue not in cam_mod:
			cam_mod.append(model_elems[x].firstChild.nodeValue)
	return cam_mod

##Creates "model" pages
def model_pages(collection,Output_Directory):
	models = get_all_models(collection);
	for x in xrange(len(models)):
		root = Element('html')
		head = SubElement(root, 'head')
		body = SubElement(root, 'body')
		title = SubElement (body,'text')
		title.text=models[x]

		works =collection.getElementsByTagName("work")
		mk = None
		for work in works:
			if len(work.getElementsByTagName("model"))>0:
				if (models[x]== work.getElementsByTagName("model")[0].firstChild.nodeValue):
					div = SubElement(body, 'div')
					p = SubElement(div, 'p')
					image = SubElement(div, 'img').set('src',
						work.getElementsByTagName('url')[0].firstChild.nodeValue)
					mk = work.getElementsByTagName('make')[0].firstChild.nodeValue

		nav = SubElement(body, 'nav')
		a = SubElement(nav, 'a')
		a.set('href','index.html')
		a.text = "Index Page"
		p = SubElement(nav, 'p')
		#Known bug.
		#Error handling for this section is required, in case the make is empty.
		a = SubElement(nav, 'a')
		a.set('href','make'+str(mk)+'.html')
		a.text = mk
		p = SubElement(nav, 'p')

		#Saving to HTML file
		htmlfile = open(Output_Directory+'model'+str(models[x])+'.html','w+')
		htmlfile.write(tostring(root))
		htmlfile.close()
	return

def main():
	#Handling command line arguments
	#Order: python RedBubbleTest.py [Save Directory Path] [API URL]
	if len(sys.argv)<2:
		URL = 'http://take-home-test.herokuapp.com/api/v1/works.xml'
		Output_Directory = ""
	elif len(sys.argv)==2:
		URL = str(sys.argv[1])
		Output_Directory = ''
	else:
		Output_Directory = str(sys.argv[1])+"/"
		if not os.path.exists(Output_Directory):
			os.makedirs(Output_Directory)
		URL = str(sys.argv[2])

	collection = get_col(URL)
	index_page(collection,Output_Directory)
	make_pages(collection,Output_Directory)
	model_pages(collection,Output_Directory)
	return

if __name__ == '__main__':
	sys.exit(main())
