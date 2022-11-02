from rat.models import Stock
import csv


def run():
    with open('rat/scripts/jasss_paper_v1.csv') as file:
        reader = csv.reader(file)
        next(reader)

        for row in reader:
            print(row)
            stock = Stock(paper_name=row[0],
                          paper_description=row[1])

            stock.save()