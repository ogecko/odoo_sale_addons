import csv
import sys

csv.field_size_limit(sys.maxsize)

path = '/home/jdm/Projects/tpp-ecommerce/odoo_sale_addons/country_state_city/demo/'

with open(path+'res.country.state.city.sydney.csv', 'rb') as csvfile:
    reader = csv.DictReader(csvfile, dialect='excel')
    out = dict()
    for row in reader:
        n = row['name']
        out[n] = row

with open(path+'res.country.state.city.sydney.geom.csv', 'rb') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        n = row[0]
        if n in out.keys():
            out[n]['geometry'] = row[1]
        else:
            print 'Cannot find key for geometry of '+n


    # for i,n in enumerate(out):
    #     print out[n]
fieldnames = ['id', 'name','postcode','region','metro','state_id/id','delivery_id/id','geometry']
with open(path+'res.country.state.city.sydney.out.csv', 'wb') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames, quoting=csv.QUOTE_NONNUMERIC)
    headers = dict( (n,n) for n in fieldnames )
    writer.writerow(headers)
    for n in out.keys():
        writer.writerow(out[n])