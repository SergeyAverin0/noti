FROM python:3.8

WORKDIR /app
COPY ./ ./

RUN pip install mkdocs

EXPOSE 8000

CMD ["mkdocs", "serve"]
