.PHONY: all clean

TEXS = ethereum-install-party.tex
PDFS = $(patsubst %.tex,%.pdf,$(TEXS))

all: $(PDFS)

%.pdf: %.tex
	pdflatex ${^}

clean:
	rm -fv *.aux *.log *.nav *.out *.snm *.toc
	rm -fv *.pdf
