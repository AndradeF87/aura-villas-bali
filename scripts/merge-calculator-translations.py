#!/usr/bin/env python3
import json

# Read the JSON file
with open('src/translations/es-ES.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# The first calculator section (line 35) has most of the keys we need
# The second calculator section (line 573) has some additional keys
# We'll merge them, keeping the structure from the first but adding missing keys from the second

# Get both calculator sections
calculator1 = data.get('calculator', {})

# Create a comprehensive merged calculator section
merged_calculator = {
    "brand": "AURA",
    "subtitle": "Villas Bali",
    "title": "Estima Tus",
    "titleHighlight": "Ingresos de Alquiler",
    "step1Description": "¿Dónde está ubicada tu villa?",
    "step2Description": "¿Cuántas habitaciones tiene tu villa?",
    "step3Description": "¿Qué categoría describe mejor tu villa?",
    "step4Description": "Personaliza con comodidades",
    "premiumLocation": "Ubicación Premium",
    "villaCategory": "Villa",
    "category": "Categoría",
    "selectCategory": "Selecciona la categoría de tu villa",
    "locations": {
        "canggu": "Canggu",
        "seminyak": "Seminyak",
        "uluwatu": "Uluwatu"
    },
    "categories": {
        "standard": {
            "name": "Estándar",
            "description": "No disponible para gestión de AURA"
        },
        "premium": {
            "name": "Premium",
            "description": "Villas de alta calidad con comodidades modernas",
            "price": "$300-500/noche"
        },
        "luxury": {
            "name": "Lujo",
            "description": "Propiedades excepcionales con características premium",
            "price": "$600-1000/noche"
        },
        "ultraLuxury": {
            "name": "Ultra-Lujo",
            "description": "Fincas de élite con comodidades de clase mundial",
            "price": "$1200+/noche"
        }
    },
    "propertyDetails": "Propiedad",
    "details": "Detalles",
    "bedroomsAmenities": "Número de habitaciones y comodidades",
    "bedrooms": "Habitaciones",
    "selectAmenities": "Seleccionar comodidades",
    "amenities": {
        "privatePool": "Piscina Privada",
        "oceanView": "Vista al Océano",
        "beachAccess": "Acceso a la Playa",
        "beachfront": "Frente a la Playa",
        "chefService": "Servicio de Chef",
        "gym": "Gimnasio y Spa",
        "cinema": "Cine en Casa",
        "chef": "Chef Privado"
    },
    "getEstimate": "Obtener Mi Estimación de Ingresos",
    "results": {
        "yourVilla": "Tu Villa",
        "earningPotential": "Potencial de Ganancias",
        "title": "Tus Ganancias Estimadas",
        "subtitle": "Basado en 20 noches de ocupación mensual promedio",
        "perNight": "Por Noche",
        "perMonth": "Por Mes",
        "perYear": "Por Año",
        "disclaimer": "Estas son estimaciones. Las ganancias reales dependen de varios factores incluyendo temporalidad, condición de la propiedad y calidad del servicio.",
        "cta": "Obtener Evaluación Profesional",
        "scrollPrompt": "Aprende cómo maximizamos los ingresos de tu villa"
    },
    "strategies": {
        "occupancyFocused": "Enfocado en Ocupación",
        "balanced": "Equilibrado",
        "revenueFocused": "Enfocado en Ingresos"
    },
    "getPersonalizedReport": "Obtener Tu Reporte Personalizado",
    "fullName": "Nombre Completo",
    "email": "Correo Electrónico",
    "phoneOptional": "Número de Teléfono (Opcional)",
    "yourEmail": "Tu Email *",
    "yourPhoneOptional": "Tu Teléfono (opcional)",
    "sending": "Enviando...",
    "getDetailedReport": "Obtener Reporte Detallado",
    "noObligation": "Sin Compromiso",
    "response24h": "Respuesta en 24h",
    "scrollToExplore": "Desplázate para explorar",
    "mobile": {
        "openCalculator": "Abrir Calculadora"
    },
    "buttons": {
        "back": "Atrás",
        "next": "Siguiente",
        "viewResults": "Ver Resultados"
    },
    "modal": {
        "applyFor": "Solicitar para Boutique Full",
        "getStarted": "Comenzar",
        "description": "Deja tus detalles y te contactaremos dentro de 24 horas con más información.",
        "sending": "Enviando...",
        "submit": "Enviar",
        "privacy": "Al enviar, aceptas ser contactado por AURA Villas Bali",
        "success": "¡Gracias! Te contactaremos pronto."
    }
}

# Update the data with the merged calculator
data['calculator'] = merged_calculator

# Write the updated JSON back
with open('src/translations/es-ES.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Successfully merged calculator sections in es-ES.json")