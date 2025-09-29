# Proyecto: Reconocimiento de dígitos

## Requisitos previos
- Node.js LTS (incluye npm)
- Visual Studio Code

## Pasos para ejecutar
```bash
# 1) instala dependencias
npm install

# 2) inicia en modo desarrollo
npm run dev
```

Abre la URL que aparezca (por ejemplo: http://localhost:5173).


## Notas
- Usa fetch con POST y FormData (sin Axios).
- Guarda cada petición en LocalStorage (consulta en /history).
- Valida que la imagen sea **exactamente 28x28 px** antes de enviar.
- Endpoint configurado: `http://ec2-54-81-142-28.compute-1.amazonaws.com:8080/predict`
