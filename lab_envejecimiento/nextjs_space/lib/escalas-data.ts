// Archivo generado automáticamente a partir de analisis_documentos.json — Escalas geriátricas del laboratorio
export type TipoItem = 'opciones' | 'numero' | 'info';
export interface OpcionItem { etiqueta: string; puntaje: number }
export interface ItemEscala {
  id: string; texto: string; tipo: TipoItem;
  opciones?: OpcionItem[];
  min?: number; max?: number; step?: number; unidad?: string;
  seccion?: string; instruccion?: string; nota?: string; opcional?: boolean;
}
export interface RangoInterpretacion { min: number; max: number; resultado: string }
export interface Escala {
  id: string; nombre: string; nombreCorto: string; categoria: string;
  descripcion: string; fuente?: string; tiempoAplicacion?: string;
  aptaMovil: boolean; razonNoApta?: string;
  metodoPuntuacion?: string; rango?: string;
  items: ItemEscala[]; interpretacion: RangoInterpretacion[];
  cualitativa?: boolean; divisor?: number; notaInterpretacion?: string;
}

export const CATEGORIAS: string[] = ["Cognitiva", "Afectiva", "Funcional", "Marcha y Caídas", "Nutricional", "Sensorial", "Social y Familiar", "Síndromes Geriátricos"];

export const ESCALAS: Escala[] = [
 {
  "id": "gds5",
  "nombre": "Escala de Depresión Geriátrica Simplificada de 5 Preguntas (GDS-5)",
  "nombreCorto": "GDS-5",
  "categoria": "Afectiva",
  "descripcion": "Instrumento breve de 5 preguntas para detección de síntomas depresivos en personas adultas mayores. Se evalúa según cómo se ha sentido la PAM en el último mes.",
  "fuente": "Sheikh JL, Yesavage JA. Geriatric Depression Scale: recent evidence and development of a shorter version. Clinical Gerontology 1986; 5:165-172.",
  "tiempoAplicacion": "5 minutos aprox.",
  "aptaMovil": true,
  "metodoPuntuacion": "Sumar las respuestas en negritas (respuesta que indica depresión): SI=1, si=0, NO=1, no=0",
  "rango": "0-5",
  "items": [
   {
    "id": "q1",
    "texto": "1. ¿Está usted, básicamente satisfecho con su vida?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. ¿Siente que su vida está vacía?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. ¿Se siente aburrido frecuentemente?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. ¿Está usted preocupado o teme que algo malo le va a pasar?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. ¿Cree usted que las otras personas están mejor que usted en general?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 0,
    "resultado": "Sin depresión"
   },
   {
    "min": 1,
    "max": 2,
    "resultado": "Depresión leve"
   },
   {
    "min": 3,
    "max": 4,
    "resultado": "Depresión moderada"
   },
   {
    "min": 5,
    "max": 5,
    "resultado": "Depresión severa"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "gds15",
  "nombre": "Escala de Depresión Geriátrica Abreviada (GDS-15)",
  "nombreCorto": "GDS-15",
  "categoria": "Afectiva",
  "descripcion": "Escala de 15 preguntas para evaluar el estado afectivo de la PAM. Se ha probado en personas mayores sanas, enfermas o con deterioro cognitivo leve a moderado en contextos comunitario, hospitalario y de cuidados a largo plazo. Se evalúa según cómo se ha sentido la PAM en el último mes.",
  "fuente": "Sheikh JL, Yesavage JA. Geriatric Depression Scale: recent evidence and development of a shorter version. Clinical Gerontology 1986; 5:165-172.",
  "tiempoAplicacion": "5 minutos aprox.",
  "aptaMovil": true,
  "metodoPuntuacion": "Sumar las respuestas en negritas (que indican depresión). Puntaje máximo: 15.",
  "rango": "0-15",
  "items": [
   {
    "id": "q1",
    "texto": "1. ¿Está usted, básicamente satisfecho con su vida?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. ¿Ha disminuido o abandonado muchos de sus intereses o actividades previas?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. ¿Siente que su vida está vacía?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. ¿Se siente aburrido frecuentemente?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. ¿Está usted de buen ánimo la mayoría del tiempo?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q6",
    "texto": "6. ¿Está usted preocupado o teme que algo malo le va a pasar?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q7",
    "texto": "7. ¿Se siente feliz la mayor parte del tiempo?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q8",
    "texto": "8. ¿Se siente con frecuencia desamparado?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q9",
    "texto": "9. ¿Prefiere usted, quedarse en casa a salir a hacer cosas nuevas?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q10",
    "texto": "10. ¿Siente usted que tiene más problemas con su memoria que otras personas de su edad?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q11",
    "texto": "11. ¿Cree usted que es maravilloso estar vivo?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q12",
    "texto": "12. ¿Se siente inútil o despreciable? ¿Cómo está usted actualmente?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q13",
    "texto": "13. ¿Se siente lleno de energía?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q14",
    "texto": "14. ¿Se encuentra sin esperanza ante su situación actual?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q15",
    "texto": "15. ¿Cree usted que las otras personas están en general mejor que usted?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 5,
    "resultado": "Sin sintomatología depresiva"
   },
   {
    "min": 6,
    "max": 15,
    "resultado": "Con sintomatología depresiva"
   }
  ],
  "cualitativa": false,
  "notaInterpretacion": "Guía INGER: 0-4 Normal; 5 o más: presencia de síntomas depresivos."
 },
 {
  "id": "mmse",
  "nombre": "Mini-Examen del Estado Mental (MMSE / Minimental de Folstein)",
  "nombreCorto": "MMSE (Minimental)",
  "categoria": "Cognitiva",
  "descripcion": "Instrumento para detectar deterioro cognitivo leve o demencia. Evalúa orientación (tiempo y lugar), memoria, atención y cálculo, memoria diferida, lenguaje (denominación, repetición, comprensión verbal y escrita, escritura) y praxia constructiva. Versión adaptada y validada en población mexicana por Sandra Reyes de Beaman y colaboradores.",
  "fuente": "Folstein MF, Folstein SE, McHugh PR. Mini mental state. A practical method for grading the cognitive state of patients for the clinician. J Psychiatr Res 1975;12:189-98.",
  "tiempoAplicacion": "10 minutos aprox.",
  "aptaMovil": false,
  "razonNoApta": "Requiere materiales físicos (reloj, lápiz, papel), dibujo de pentágonos, escritura manual y evaluación presencial de actividades motoras.",
  "metodoPuntuacion": "Sumar todos los puntos. Puntaje máximo: 30. Para personas con ≤3 años de escolaridad se otorgan 8 puntos base y no se aplican 4 reactivos específicos.",
  "rango": "0-30",
  "items": [
   {
    "id": "s0",
    "texto": "Orientación en Tiempo (0-5 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 5,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Orientación en Tiempo",
    "instruccion": "1. ¿En qué año estamos? | 2. ¿En qué mes estamos? | 3. ¿Qué día del mes es hoy? | 4. ¿Qué día de la semana es hoy? | 5. ¿Qué hora es aproximadamente?",
    "opcional": false
   },
   {
    "id": "s1",
    "texto": "Orientación en Lugar (0-5 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 5,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Orientación en Lugar",
    "instruccion": "1. ¿En dónde estamos ahora? | 2. ¿En qué piso estamos? | 3. ¿Qué colonia es esta? | 4. ¿Qué ciudad es esta? | 5. ¿En qué país estamos?",
    "opcional": false
   },
   {
    "id": "s2",
    "texto": "Memoria (Registro) (0-3 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 3,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Memoria (Registro)",
    "instruccion": "Le voy a decir 3 objetos. Cuando yo termine, quiero que por favor usted los repita. Máximo 3 intentos. — Palabras: Papel, Bicicleta, Cuchara",
    "opcional": false
   },
   {
    "id": "s3",
    "texto": "Atención y Cálculo (0-5 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 5,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Atención y Cálculo",
    "instruccion": "Reste de 7 en 7 a partir de 100 (escolaridad > 8 años): 93, 86, 79, 72, 65 — Reste de 3 en 3 a partir de 20 (escolaridad < 8 años): 17, 14, 11, 8, 5",
    "nota": "Para personas con 3 o menos años de escolaridad formal, se asignan 8 puntos directamente y no se aplican estos reactivos.",
    "opcional": false
   },
   {
    "id": "s4",
    "texto": "Memoria Diferida (Evocación) (0-3 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 3,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Memoria Diferida (Evocación)",
    "instruccion": "Dígame los 3 objetos que le mencioné al principio. — Palabras: Papel, Bicicleta, Cuchara",
    "opcional": false
   },
   {
    "id": "s5",
    "texto": "Lenguaje - Denominación (0-2 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 2,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Lenguaje - Denominación",
    "instruccion": "Muestre un reloj y pregunte: ¿Qué es esto? Muestre un lápiz y pregunte: ¿Qué es esto?",
    "opcional": false
   },
   {
    "id": "s6",
    "texto": "Lenguaje - Repetición (0-1 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 1,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Lenguaje - Repetición",
    "instruccion": "Repita esta frase (sólo una vez): 'Ni no, ni sí, ni pero'",
    "opcional": false
   },
   {
    "id": "s7",
    "texto": "Lenguaje - Comprensión verbal (Orden secuencial) (0-3 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 3,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Lenguaje - Comprensión verbal (Orden secuencial)",
    "instruccion": "Dar la orden en secuencia: — 1. Tome este papel con la mano derecha 2. Dóblelo por la mitad 3. Y déjelo en el suelo",
    "opcional": false
   },
   {
    "id": "s8",
    "texto": "Lenguaje - Comprensión escrita (0-1 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 1,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Lenguaje - Comprensión escrita",
    "instruccion": "Muestre la orden escrita: 'CIERRE LOS OJOS'",
    "nota": "No se aplica a personas con 3 o menos años de escolaridad.",
    "opcional": false
   },
   {
    "id": "s9",
    "texto": "Lenguaje - Escritura (0-1 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 1,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Lenguaje - Escritura",
    "instruccion": "Quiero que escriba una frase que tenga sentido o coherencia.",
    "nota": "No se aplica a personas con 3 o menos años de escolaridad.",
    "opcional": false
   },
   {
    "id": "s10",
    "texto": "Praxia constructiva - Copia de dibujo (0-1 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 1,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Praxia constructiva - Copia de dibujo",
    "instruccion": "Copie el dibujo de dos pentágonos que se entrecruzan. La acción es correcta si los dos pentágonos se entrecruzan y debe tener 10 ángulos.",
    "nota": "No se aplica a personas con 3 o menos años de escolaridad.",
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 23,
    "resultado": "Probable deterioro cognitivo (positivo)"
   },
   {
    "min": 24,
    "max": 30,
    "resultado": "Sin deterioro cognitivo (negativo)"
   }
  ],
  "cualitativa": false,
  "notaInterpretacion": "Para personas con ≤3 años de escolaridad se otorgan 8 puntos base y no se aplican 4 reactivos específicos."
 },
 {
  "id": "incontinencia",
  "nombre": "Cuestionario de Incontinencia Urinaria",
  "nombreCorto": "Incontinencia Urinaria",
  "categoria": "Síndromes Geriátricos",
  "descripcion": "Cuestionario breve para identificar posible trastorno en la continencia urinaria de la PAM.",
  "aptaMovil": true,
  "metodoPuntuacion": "Se suma el total. POSITIVO con 1 o más puntos (Sí); NEGATIVO cuando la sumatoria es 0.",
  "rango": "0-4",
  "items": [
   {
    "id": "q1",
    "texto": "1. ¿Pierde usted orina cuando no lo desea?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. ¿Usa usted algún protector, toalla o paño higiénico en caso de pérdida de orina?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. ¿Tiene usted problemas con su vejiga, se moja sin querer?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. ¿Acude a menudo a orinar al baño, con mayor frecuencia en la noche?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 0,
    "resultado": "Negativo (sin incontinencia)"
   },
   {
    "min": 1,
    "max": 4,
    "resultado": "Positivo (posible incontinencia urinaria)"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "caidas-deteccion",
  "nombre": "Síndrome de Caídas (Detección)",
  "nombreCorto": "Síndrome de Caídas",
  "categoria": "Marcha y Caídas",
  "descripcion": "Pregunta única para detección del síndrome de caídas.",
  "aptaMovil": true,
  "items": [
   {
    "id": "q1",
    "texto": "1. ¿Ha presentado 2 o más caídas en el último año?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 0,
    "resultado": "Negativo"
   },
   {
    "min": 1,
    "max": 1,
    "resultado": "Positivo: se sugiere aplicar valoración de marcha y equilibrio"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "ingerdesica",
  "nombre": "INGERDESICA - Investigación Gerontológica del Riesgo para el Desarrollo del Síndrome de Caídas",
  "nombreCorto": "INGERDESICA",
  "categoria": "Marcha y Caídas",
  "descripcion": "Cuestionario extenso sobre factores de riesgo en el hogar para caídas. Evalúa condiciones del hogar (pisos, iluminación, mobiliario), baño, cocina, pasillos, escaleras y calzado. CADA respuesta negativa requiere una intervención específica.",
  "fuente": "Clinical Report On Aging, Vol. 1, Modificado y adaptado por el Programa de Atención al Envejecimiento, Secretaría de Salud.",
  "aptaMovil": true,
  "metodoPuntuacion": "NO tiene línea de corte. Cada respuesta negativa requiere una intervención específica para el tópico descrito.",
  "items": [
   {
    "id": "q1",
    "texto": "1. ¿Los pisos y tapetes están en buenas condiciones, sin obstáculos que pudieran ocasionar tropiezos y caídas?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "General",
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. ¿Están bien fijos los bordes de las alfombras?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "General",
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. ¿Hay desorden en los pasillos o sitios por donde transita la persona adulta mayor?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "General",
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. ¿La luz es adecuada? (Sin que deslumbre o produzca destellos)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "General",
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. ¿Las luces de noche están distribuidas estratégicamente en la casa sobre todo en lugares peligrosos como las escaleras y el baño?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "General",
    "opcional": false
   },
   {
    "id": "q6",
    "texto": "6. ¿Las camas, sillas y sofás tienen la altura suficiente para permitir que la PAM se siente y levante con facilidad?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "General",
    "opcional": false
   },
   {
    "id": "q7",
    "texto": "7. ¿Los teléfonos están localizados de tal forma que las personas no tengan que apresurarse a contestarlos?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "General",
    "opcional": false
   },
   {
    "id": "q8",
    "texto": "8. ¿Los cables eléctricos se encuentran en los sitios de paso?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "General",
    "opcional": false
   },
   {
    "id": "q9",
    "texto": "9. ¿Para limpiar el baño se usa alfombra o adhesivo antiderrapante en la bañera o ducha?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Baño",
    "opcional": false
   },
   {
    "id": "q10",
    "texto": "10. ¿Los tapetes tienen una superficie antiderrapante, sobre todo aquellos que están camino al baño?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Baño",
    "opcional": false
   },
   {
    "id": "q11",
    "texto": "11. ¿Los derrames se limpian pronto para evitar resbalar con ellos?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Cocina",
    "opcional": false
   },
   {
    "id": "q12",
    "texto": "12. ¿Los utensilios más usados se encuentran a la altura de la cintura?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Cocina",
    "opcional": false
   },
   {
    "id": "q13",
    "texto": "13. ¿La mesa y sillas de la cocina son firmes y seguras?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Cocina",
    "opcional": false
   },
   {
    "id": "q14",
    "texto": "14. ¿Hay desorden en los pasillos?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Pasillo",
    "opcional": false
   },
   {
    "id": "q15",
    "texto": "15. ¿Permanecen apartados del camino los cables del teléfono y de otros aparatos?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Pasillo",
    "opcional": false
   },
   {
    "id": "q16",
    "texto": "16. ¿Cuentan con uno o dos pasamanos al lado de la(s) escalera(s)?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Escalera",
    "opcional": false
   },
   {
    "id": "q17",
    "texto": "17. ¿Se coloca cinta brillante antideslizante en el primer y último escalón?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Escalera",
    "opcional": false
   },
   {
    "id": "q18",
    "texto": "18. ¿Tiene sus zapatos suela o tacones que eviten los deslizamientos?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Calzado",
    "opcional": false
   },
   {
    "id": "q19",
    "texto": "19. ¿Utiliza zapatos, zapatillas o sandalias bien ajustadas que no se salgan del pie?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Calzado",
    "opcional": false
   },
   {
    "id": "q20",
    "texto": "20. ¿Evita caminar descalzo?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Calzado",
    "opcional": false
   },
   {
    "id": "q21",
    "texto": "21. ¿Sustituye el calzado cuando se gastan y se vuelven resbaladizos?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Calzado",
    "opcional": false
   }
  ],
  "interpretacion": [],
  "cualitativa": true,
  "notaInterpretacion": "No tiene línea de corte. Cada respuesta 'No' (o condición de riesgo presente) indica un factor de riesgo que requiere una intervención específica para el tópico descrito."
 },
 {
  "id": "katz",
  "nombre": "Índice de Independencia en las Actividades Básicas de la Vida Diaria (Katz)",
  "nombreCorto": "Índice de Katz (ABVD)",
  "categoria": "Funcional",
  "descripcion": "Evalúa la independencia de la PAM en 6 actividades básicas: bañarse, vestirse, uso del sanitario, levantarse de la cama, continencia de esfínteres y comer. Permite conocer el grado de deterioro funcional.",
  "fuente": "Branch LG, Katz S, Kniepmann K, Papsidero JA. A Prospective study of functional status among community elders. Am J Public Health 1984;74:266-268.",
  "tiempoAplicacion": "5 minutos aprox.",
  "aptaMovil": true,
  "metodoPuntuacion": "Sumar los puntos parciales de las 6 actividades.",
  "rango": "0-6",
  "items": [
   {
    "id": "q1",
    "texto": "1. Bañarse",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "No recibe asistencia (entra y sale de la bañera por sí mismo)",
      "puntaje": 0
     },
     {
      "etiqueta": "Recibe asistencia al lavar únicamente una parte del cuerpo (espalda o una pierna)",
      "puntaje": 0.5
     },
     {
      "etiqueta": "Recibe asistencia al lavar más de una parte del cuerpo (o no se lava)",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. Vestirse",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Saca la ropa y se viste completamente sin asistencia",
      "puntaje": 0
     },
     {
      "etiqueta": "Saca la ropa y se viste con asistencia parcial",
      "puntaje": 0.5
     },
     {
      "etiqueta": "Recibe asistencia total para sacar la ropa o vestirse",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. Utilizar el sanitario",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Va al sanitario, orina y/o evacua, se lava, se arregla la ropa sin asistencia",
      "puntaje": 0
     },
     {
      "etiqueta": "Recibe asistencia para ir al sanitario o para lavarse o arreglarse la ropa tras la evacuación",
      "puntaje": 0.5
     },
     {
      "etiqueta": "Incapaz de ir al baño para el proceso de evacuación",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. Levantarse de la cama",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Se acuesta y se levanta de la cama así como de la silla sin ayuda (puede utilizar un objeto de apoyo como bastón)",
      "puntaje": 0
     },
     {
      "etiqueta": "Se acuesta y se levanta de la cama o la silla con asistencia",
      "puntaje": 0.5
     },
     {
      "etiqueta": "No se puede levantar de la cama por sí mismo",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. Continencia de esfínteres",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Controla la micción y la defecación por sí mismo y a cualquier hora del día",
      "puntaje": 0
     },
     {
      "etiqueta": "Sufre accidentes 'ocasionalmente' (incontinencia urinaria o fecal)",
      "puntaje": 0.5
     },
     {
      "etiqueta": "Usa una sonda o es incontinente urinario o fecal independientemente de la hora",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q6",
    "texto": "6. Comer",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Come sin asistencia",
      "puntaje": 0
     },
     {
      "etiqueta": "Se alimenta solo, pero requiere asistencia para cortar la carne o untar el pan",
      "puntaje": 0.5
     },
     {
      "etiqueta": "Recibe asistencia al alimentarse o es alimentado parcial o completamente mediante sondas o líquidos endovenosos",
      "puntaje": 1
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 0,
    "resultado": "No hay deterioro funcional (Negativo)"
   },
   {
    "min": 0.5,
    "max": 2,
    "resultado": "Deterioro funcional leve"
   },
   {
    "min": 2.5,
    "max": 4,
    "resultado": "Deterioro funcional moderado"
   },
   {
    "min": 4.5,
    "max": 6,
    "resultado": "Deterioro funcional severo"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "lawton",
  "nombre": "Índice de Actividades Instrumentales de la Vida Diaria (Lawton & Brody)",
  "nombreCorto": "Lawton & Brody (AIVD)",
  "categoria": "Funcional",
  "descripcion": "Evalúa la independencia en 8 actividades instrumentales: uso del teléfono, hacer compras, preparación de comida, cuidado de la casa, lavado de ropa, uso de transporte, responsabilidad con medicamentos y manejo de asuntos económicos. Detecta primeros indicios de deterioro funcional.",
  "fuente": "Lawton MP, Brody EM. Assessment of older people: Self-maintaining and instrumental activities of daily living. Gerontologist 1969;9:179-186.",
  "tiempoAplicacion": "10 minutos aprox.",
  "aptaMovil": true,
  "metodoPuntuacion": "Sumar los puntos de las 8 actividades. El máximo puede ser menor si se omiten actividades nunca realizadas por la PAM.",
  "rango": "0-8",
  "items": [
   {
    "id": "q1",
    "texto": "1. Capacidad para usar el teléfono",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Utiliza el teléfono por iniciativa propia",
      "puntaje": 1
     },
     {
      "etiqueta": "Es capaz de marcar bien algunos números familiares",
      "puntaje": 1
     },
     {
      "etiqueta": "Es capaz de contestar al teléfono, pero no de marcar",
      "puntaje": 1
     },
     {
      "etiqueta": "No es capaz de usar el teléfono",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. Hacer compras",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Realiza todas las compras necesarias de forma independiente",
      "puntaje": 1
     },
     {
      "etiqueta": "Realiza pequeñas compras de forma independiente",
      "puntaje": 0
     },
     {
      "etiqueta": "Necesita ir acompañado para hacer cualquier compra",
      "puntaje": 0
     },
     {
      "etiqueta": "Totalmente incapaz de comprar",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. Preparación de la comida",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Organiza, prepara y sirve las comidas adecuadamente por sí solo",
      "puntaje": 1
     },
     {
      "etiqueta": "Prepara adecuadamente las comidas si se le proporcionan los ingredientes",
      "puntaje": 0
     },
     {
      "etiqueta": "Prepara, calienta y sirve las comidas, pero no sigue una dieta adecuada",
      "puntaje": 0
     },
     {
      "etiqueta": "Necesita que le preparen y sirvan las comidas",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. Cuidado de la casa",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mantiene la casa solo o con ayuda ocasional (para trabajos pesados)",
      "puntaje": 1
     },
     {
      "etiqueta": "Realiza tareas ligeras, como lavar los platos o hacer las camas",
      "puntaje": 1
     },
     {
      "etiqueta": "Realiza tareas ligeras, pero no puede mantener una limpieza adecuada",
      "puntaje": 1
     },
     {
      "etiqueta": "Necesita ayuda en todas las labores de la casa",
      "puntaje": 0
     },
     {
      "etiqueta": "No participa en ninguna labor de la casa",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. Lavado de la ropa",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Lava por sí solo toda la ropa",
      "puntaje": 1
     },
     {
      "etiqueta": "Lava por sí solo pequeñas prendas",
      "puntaje": 1
     },
     {
      "etiqueta": "Todo el lavado de ropa debe ser realizado por otra persona",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q6",
    "texto": "6. Uso de medios de transporte",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Viaja solo en transporte público o conduce su propio coche",
      "puntaje": 1
     },
     {
      "etiqueta": "Es capaz de coger un taxi, pero no usa otro medio de transporte",
      "puntaje": 1
     },
     {
      "etiqueta": "Viaja en transporte público cuando va acompañado con otra persona",
      "puntaje": 1
     },
     {
      "etiqueta": "Solo utiliza el taxi o el automóvil con ayuda de otras personas",
      "puntaje": 0
     },
     {
      "etiqueta": "No viaja",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q7",
    "texto": "7. Responsabilidad respecto a sus medicamentos",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Es capaz de tomar por sí mismo sus medicamentos a la hora indicada y con la dosis correcta",
      "puntaje": 1
     },
     {
      "etiqueta": "Toma sus medicamentos si la dosis le es preparada previamente",
      "puntaje": 0
     },
     {
      "etiqueta": "No es capaz de administrarse sus medicamentos",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q8",
    "texto": "8. Manejo de sus asuntos económicos",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Se encarga de sus asuntos económicos por sí solo",
      "puntaje": 1
     },
     {
      "etiqueta": "Realiza las compras de cada día, pero necesita ayuda en las grandes compras, bancos, etc.",
      "puntaje": 1
     },
     {
      "etiqueta": "Incapaz de manejar dinero",
      "puntaje": 0
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 0,
    "resultado": "Dependiente"
   },
   {
    "min": 1,
    "max": 6,
    "resultado": "Semidependiente"
   },
   {
    "min": 7,
    "max": 8,
    "resultado": "Independiente"
   }
  ],
  "cualitativa": false,
  "notaInterpretacion": "El máximo puede ser menor si se omiten actividades nunca realizadas por la PAM."
 },
 {
  "id": "osteoporosis",
  "nombre": "Cuestionario para Detección de Riesgo de Fracturas por Osteoporosis",
  "nombreCorto": "Riesgo de Fracturas (Osteoporosis)",
  "categoria": "Síndromes Geriátricos",
  "descripcion": "Cuestionario de 9 preguntas para personas de 50 años y más que permite identificar el riesgo de fractura por osteoporosis. El resultado se cruza con edad e IMC en la Tabla de Riesgo.",
  "fuente": "CENAPRECE, adaptación del FRAX 2023.",
  "aptaMovil": false,
  "razonNoApta": "Requiere tabla de riesgo cruzada compleja (edad × IMC × sexo × factores) para interpretar el resultado.",
  "metodoPuntuacion": "Sumar el total y cruzar con edad e IMC en la Tabla de Riesgo de Fracturas por Osteoporosis. En caso de obtener 7-9 puntos, se considera igual a 6 para la tabla.",
  "rango": "0-9",
  "items": [
   {
    "id": "q1",
    "texto": "1. ¿Ha tenido una fractura previa en los últimos dos años? (fractura de vértebras, fémur o cadera sin trauma severo)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. ¿Alguno de sus padres ha tenido fractura de cadera?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. ¿Fuma actualmente?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. ¿Utiliza glucocorticoides o los ha tomado por más de 3 meses? (Dosis mayor a 7.5 mg al día de prednisona o su equivalente)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. ¿Le han diagnosticado artritis reumatoide? (excepto osteoartritis)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q6",
    "texto": "6. ¿Le han diagnosticado Diabetes Mellitus tipo 2?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q7",
    "texto": "7. ¿Ha tenido dos o más caídas en los últimos 12 meses?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q8",
    "texto": "8. ¿Presenta osteoporosis secundaria? (diabetes tipo I, osteogénesis imperfecta del adulto, hipertiroidismo no tratado, hipogonadismo o menopausia prematura <45 años, malnutrición o malabsorción crónicas o hepatopatía crónica)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q9",
    "texto": "9. ¿Toma 3 o más copas diarias de alcohol? (más de 60 ml de bebidas alcohólicas)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [],
  "cualitativa": true,
  "notaInterpretacion": "El puntaje total debe cruzarse con edad, sexo e IMC en la Tabla de Riesgo de Fracturas por Osteoporosis para determinar Bajo, Mediano o Alto Riesgo. Con 7-9 puntos se considera igual a 6 para la tabla."
 },
 {
  "id": "riesgo-demencia",
  "nombre": "Factores de Riesgo para el Desarrollo de Demencia",
  "nombreCorto": "Factores de Riesgo de Demencia",
  "categoria": "Cognitiva",
  "descripcion": "Cuestionario de 12 factores que evalúa el riesgo para el desarrollo de demencia en personas de 50 años y más. Incluye factores como edad, escolaridad, sexo, presión arterial, IMC, colesterol, actividad física, tabaquismo, audición, diabetes y problemas de memoria.",
  "aptaMovil": true,
  "metodoPuntuacion": "Sumar la totalidad de los puntos.",
  "rango": "0-20",
  "items": [
   {
    "id": "q1",
    "texto": "1. ¿Tiene usted 53 años o menos?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí (53 años o menos)",
      "puntaje": 0
     },
     {
      "etiqueta": "No (Mayor a 53 años)",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. ¿Cuántos años escolares tiene?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "10 años o más",
      "puntaje": 0
     },
     {
      "etiqueta": "7 a 9 años",
      "puntaje": 2
     },
     {
      "etiqueta": "Menos de 7 años",
      "puntaje": 3
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. Sexo",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Hombre",
      "puntaje": 0
     },
     {
      "etiqueta": "Mujer",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. Presión arterial sistólica",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "< 140 mmHg",
      "puntaje": 0
     },
     {
      "etiqueta": "> 140 mmHg",
      "puntaje": 2
     }
    ],
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. IMC",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "< 30 kg/m²",
      "puntaje": 0
     },
     {
      "etiqueta": "> 30 kg/m²",
      "puntaje": 2
     }
    ],
    "opcional": false
   },
   {
    "id": "q6",
    "texto": "6. Colesterol total o referencia verbal",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "< 6.5 mmol/L (Normal)",
      "puntaje": 0
     },
     {
      "etiqueta": "> 6.5 mmol/L (Alto)",
      "puntaje": 2
     }
    ],
    "opcional": false
   },
   {
    "id": "q7",
    "texto": "7. ¿Realiza actividad física?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q8",
    "texto": "8. ¿Vive solo?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "No",
      "puntaje": 0
     },
     {
      "etiqueta": "Sí",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q9",
    "texto": "9. ¿Fuma actualmente?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "No",
      "puntaje": 0
     },
     {
      "etiqueta": "Sí (<10 cigarrillos/día)",
      "puntaje": 1
     },
     {
      "etiqueta": "Sí (>10 cigarrillos/día)",
      "puntaje": 2
     }
    ],
    "opcional": false
   },
   {
    "id": "q10",
    "texto": "10. ¿Tiene dificultades para escuchar?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "No",
      "puntaje": 0
     },
     {
      "etiqueta": "Sí",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q11",
    "texto": "11. ¿Padece diabetes mellitus tipo 2?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "No",
      "puntaje": 0
     },
     {
      "etiqueta": "Sí",
      "puntaje": 1
     }
    ],
    "opcional": false
   },
   {
    "id": "q12",
    "texto": "12. ¿Tiene problemas de memoria?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "No",
      "puntaje": 0
     },
     {
      "etiqueta": "Sí",
      "puntaje": 1
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 7,
    "resultado": "Bajo Riesgo"
   },
   {
    "min": 8,
    "max": 11,
    "resultado": "Mediano Riesgo"
   },
   {
    "min": 12,
    "max": 20,
    "resultado": "Alto Riesgo"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "iqcode",
  "nombre": "IQCODE - Cuestionario del Informante Sobre Deterioro Cognoscitivo en el Anciano",
  "nombreCorto": "IQCODE",
  "categoria": "Cognitiva",
  "descripcion": "Cuestionario de 16 preguntas aplicado al informante/cuidador para evaluar si la PAM ha mejorado, está igual o ha empeorado en comparación con hace 10 años. Evalúa memoria, aprendizaje, toma de decisiones y manejo financiero.",
  "fuente": "CONAEN. Guía de consulta para el Médico de Primer Nivel de Atención. Alteraciones en la Memoria de la Persona Adulta Mayor, 2010. CENAPRECE.",
  "aptaMovil": true,
  "metodoPuntuacion": "Sumar el total de puntaje y dividir entre 16.",
  "rango": "1.0 - 5.0",
  "items": [
   {
    "id": "q1",
    "texto": "1. Recuerda cosas relacionadas con sus familiares y amigos (cumpleaños, ocupación, direcciones)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. Recuerda cosas que han pasado recientemente",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. Recuerda conversaciones recientes pocos días después",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. Recuerda su dirección y número de teléfono",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. Recuerda en qué día y mes estamos hoy",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q6",
    "texto": "6. Recuerda dónde guarda usualmente las cosas",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q7",
    "texto": "7. Recuerda dónde encontrar las cosas que han sido guardadas en un lugar distinto al usual",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q8",
    "texto": "8. Sabe cómo utilizar nuevas máquinas de uso doméstico (licuadora, TV, radio)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q9",
    "texto": "9. Aprende a utilizar nuevas máquinas de uso doméstico",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q10",
    "texto": "10. En general aprende cosas nuevas",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q11",
    "texto": "11. Sigue la historia de un libro o de una telenovela",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q12",
    "texto": "12. Toma decisiones en asuntos de la vida diaria",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q13",
    "texto": "13. Maneja el dinero de sus compras",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q14",
    "texto": "14. Maneja asuntos financieros (cobros de pensión, trámites bancarios)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q15",
    "texto": "15. Resuelve cálculos matemáticos sencillos relacionados con la vida diaria (porciones adecuadas de comida)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q16",
    "texto": "16. Usa su inteligencia para entender qué está pasando y razona las cosas",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho mejor",
      "puntaje": 1
     },
     {
      "etiqueta": "Un poco mejor",
      "puntaje": 2
     },
     {
      "etiqueta": "No ha cambiado mucho",
      "puntaje": 3
     },
     {
      "etiqueta": "Un poco peor",
      "puntaje": 4
     },
     {
      "etiqueta": "Francamente peor",
      "puntaje": 5
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 1,
    "max": 3.49,
    "resultado": "Sin deterioro cognitivo probable"
   },
   {
    "min": 3.5,
    "max": 5,
    "resultado": "Probable deterioro cognitivo"
   }
  ],
  "cualitativa": false,
  "divisor": 16,
  "notaInterpretacion": "El puntaje final es el promedio: suma total dividida entre 16."
 },
 {
  "id": "tug",
  "nombre": "Prueba Levántate y Anda (Timed Up and Go / Get Up and Go)",
  "nombreCorto": "Levántate y Anda (TUG)",
  "categoria": "Marcha y Caídas",
  "descripcion": "Prueba cronometrada que evalúa la movilidad básica y probables trastornos de la marcha y balance. La PAM debe levantarse de una silla, caminar 3 metros, regresar y sentarse. Evalúa estabilidad postural y longitud del paso.",
  "fuente": "Mathias S, Nayak USL, Isaac B. Balance in elderly patients: the 'Get Up and Go' Test. Arch Phys Med Rehabil 1986;67:387-389.",
  "tiempoAplicacion": "10 minutos aprox.",
  "aptaMovil": false,
  "razonNoApta": "Requiere evaluación presencial con silla, espacio de 3 metros y cronómetro.",
  "metodoPuntuacion": "Medir el tiempo total en segundos desde que se levanta hasta que se sienta.",
  "items": [
   {
    "id": "tiempo",
    "texto": "Tiempo total (segundos)",
    "tipo": "numero",
    "min": 0,
    "max": 300,
    "step": 0.1,
    "unidad": "segundos",
    "instruccion": "1. Levantarse de la silla 2. Caminar 3 metros (en línea) 3. Caminar de regreso a la silla 4. Sentarse",
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 9.99,
    "resultado": "Normal"
   },
   {
    "min": 10,
    "max": 13,
    "resultado": "Discapacidad leve de la movilidad"
   },
   {
    "min": 13.01,
    "max": 10000,
    "resultado": "Riesgo elevado de caídas"
   }
  ],
  "cualitativa": false,
  "notaInterpretacion": "Interpretación según Guía INGER (<10 s normal; 11-13 s discapacidad leve; >13 s riesgo elevado de caídas). Según el formato del laboratorio: <20 s Normal, >20 s Anormal."
 },
 {
  "id": "zarit",
  "nombre": "Cuestionario de Sobrecarga del Cuidador (Zarit & Zarit)",
  "nombreCorto": "Zarit (Sobrecarga del Cuidador)",
  "categoria": "Social y Familiar",
  "descripcion": "Escala de 22 preguntas para detectar sobrecarga en el cuidador de la PAM. Evalúa aspectos de carga emocional, social, económica y de salud del cuidador.",
  "fuente": "Zarit SH. Predictors of outcome among day care participants. Long Term Care Health Serv Adm Q. 1978;2(2):150-162.",
  "aptaMovil": true,
  "metodoPuntuacion": "Sumar el puntaje total de las 22 preguntas.",
  "rango": "0-88",
  "items": [
   {
    "id": "q1",
    "texto": "1. ¿Piensa que la persona que cuida le pide más ayuda de la que realmente necesita?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. ¿Piensa que debido a las horas que le dedica a la persona que cuida no tiene suficiente tiempo para usted?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. ¿Se siente agobiado por intentar compatibilizar el cuidado de la persona que atiende con otras responsabilidades (trabajo, familia)?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. ¿Siente vergüenza por la conducta de la persona que cuida?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. ¿Se siente enfadado cuando está cerca de la persona que cuida?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q6",
    "texto": "6. ¿Piensa que el cuidar a la persona que usted atiende afecta negativamente la relación que tiene con otros miembros de la familia?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q7",
    "texto": "7. ¿Tiene miedo por el futuro de la persona que cuida?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q8",
    "texto": "8. ¿Piensa que la persona que cuida depende de usted?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q9",
    "texto": "9. ¿Se siente tenso cuando está cerca de la persona que cuida?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q10",
    "texto": "10. ¿Piensa que su salud ha empeorado debido a la tarea o trabajo de cuidador?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q11",
    "texto": "11. ¿Piensa que no tiene tanta intimidad como le gustaría debido a la tarea o trabajo de cuidador?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q12",
    "texto": "12. ¿Piensa que su vida social se ha visto afectada de manera negativa por tener que fungir como cuidador?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q13",
    "texto": "13. ¿Se siente incómodo por distanciarse de sus amistades por ser cuidador?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q14",
    "texto": "14. ¿Piensa que la persona que atiende considera que sólo usted la puede cuidar?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q15",
    "texto": "15. ¿Piensa que no tiene suficientes ingresos económicos para fungir como cuidador?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q16",
    "texto": "16. ¿Piensa que no será capaz de fungir como cuidador por mucho más tiempo?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q17",
    "texto": "17. ¿Siente que ha perdido el control de su vida desde que comenzó a fungir como cuidador?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q18",
    "texto": "18. ¿Desearía dejar de fungir como cuidador?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q19",
    "texto": "19. ¿Se siente indeciso sobre qué hacer con la persona que cuida?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q20",
    "texto": "20. ¿Piensa que debería hacer más por la persona que cuida?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q21",
    "texto": "21. ¿Piensa que podría cuidar mejor a la persona que atiende?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q22",
    "texto": "22. ¿Qué tan frecuentemente experimenta el ser cuidador como una carga?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Rara vez",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Bastantes veces",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 46,
    "resultado": "No se encuentra en sobrecarga"
   },
   {
    "min": 47,
    "max": 55,
    "resultado": "Sobrecarga leve"
   },
   {
    "min": 56,
    "max": 88,
    "resultado": "Sobrecarga intensa"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "apgar",
  "nombre": "APGAR Familiar",
  "nombreCorto": "APGAR Familiar",
  "categoria": "Social y Familiar",
  "descripcion": "Cuestionario de 7 preguntas para evaluar la funcionalidad familiar percibida por la PAM. Evalúa adaptabilidad, participación, crecimiento, afecto y resolución de la familia, además de apoyo de amigos.",
  "fuente": "Bellon JA, Delgado A, Luna del Castillo JD, Lardelli P. Validez y fiabilidad del cuestionario de función familiar APGAR-familiar. Aten Primaria 1987;18(6):289-96.",
  "aptaMovil": true,
  "metodoPuntuacion": "Sumar el total de las 7 preguntas.",
  "rango": "0-28",
  "items": [
   {
    "id": "q1",
    "texto": "1. Me satisface la ayuda que recibo de mi familia cuando tengo un problema y/o necesidad.",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Casi nunca",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 3
     },
     {
      "etiqueta": "Siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. Me satisface como en mi familia hablamos y compartimos nuestros problemas.",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Casi nunca",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 3
     },
     {
      "etiqueta": "Siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. Me satisface cómo mi familia acepta y apoya mis deseos de emprender nuevas actividades.",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Casi nunca",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 3
     },
     {
      "etiqueta": "Siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. Me satisface cómo mi familia expresa afecto y responde a mis emociones tales como rabia, tristeza, amor.",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Casi nunca",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 3
     },
     {
      "etiqueta": "Siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. Me satisface cómo compartimos en mi familia el tiempo para estar juntos, los espacios en la casa y el dinero.",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Casi nunca",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 3
     },
     {
      "etiqueta": "Siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q6",
    "texto": "6. ¿Usted tiene algún amigo(a) cercano(a) a quien pueda buscar cuando necesita ayuda?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Casi nunca",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 3
     },
     {
      "etiqueta": "Siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   },
   {
    "id": "q7",
    "texto": "7. Estoy satisfecho(a) con el soporte que recibo de mis amigas o amigos.",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Nunca",
      "puntaje": 0
     },
     {
      "etiqueta": "Casi nunca",
      "puntaje": 1
     },
     {
      "etiqueta": "Algunas veces",
      "puntaje": 2
     },
     {
      "etiqueta": "Casi siempre",
      "puntaje": 3
     },
     {
      "etiqueta": "Siempre",
      "puntaje": 4
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 9,
    "resultado": "Disfunción familiar severa"
   },
   {
    "min": 10,
    "max": 13,
    "resultado": "Disfunción familiar moderada"
   },
   {
    "min": 14,
    "max": 17,
    "resultado": "Disfunción familiar leve"
   },
   {
    "min": 18,
    "max": 28,
    "resultado": "Buena función familiar"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "duke-unc",
  "nombre": "Cuestionario de Apoyo Social Percibido (DUKE-UNC)",
  "nombreCorto": "DUKE-UNC (Apoyo Social)",
  "categoria": "Social y Familiar",
  "descripcion": "Cuestionario de 11 preguntas para evaluar el apoyo social percibido por la PAM. Evalúa apoyo confidencial y afectivo.",
  "fuente": "Broadhead WE, Gehlbach SH, DeGruy FV, Kaplan BH. The Duke-UNC Functional Social Support Questionnaire: measurement of social support in family medicine patients. Med Care 1988;26:709-23.",
  "aptaMovil": true,
  "metodoPuntuacion": "Sumar el total de las 11 preguntas.",
  "rango": "11-55",
  "items": [
   {
    "id": "q1",
    "texto": "1. Recibo visitas de mis amigos y familiares",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho menos de lo que deseo",
      "puntaje": 1
     },
     {
      "etiqueta": "Menos de lo que deseo",
      "puntaje": 2
     },
     {
      "etiqueta": "Ni mucho ni poco",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi como deseo",
      "puntaje": 4
     },
     {
      "etiqueta": "Tanto como deseo",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. Recibo ayuda en asuntos relacionados con mi casa",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho menos de lo que deseo",
      "puntaje": 1
     },
     {
      "etiqueta": "Menos de lo que deseo",
      "puntaje": 2
     },
     {
      "etiqueta": "Ni mucho ni poco",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi como deseo",
      "puntaje": 4
     },
     {
      "etiqueta": "Tanto como deseo",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. Recibo elogios y reconocimientos cuando hago bien mi trabajo",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho menos de lo que deseo",
      "puntaje": 1
     },
     {
      "etiqueta": "Menos de lo que deseo",
      "puntaje": 2
     },
     {
      "etiqueta": "Ni mucho ni poco",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi como deseo",
      "puntaje": 4
     },
     {
      "etiqueta": "Tanto como deseo",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. Cuento con personas que se preocupan de lo que me sucede",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho menos de lo que deseo",
      "puntaje": 1
     },
     {
      "etiqueta": "Menos de lo que deseo",
      "puntaje": 2
     },
     {
      "etiqueta": "Ni mucho ni poco",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi como deseo",
      "puntaje": 4
     },
     {
      "etiqueta": "Tanto como deseo",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. Recibo amor y afecto",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho menos de lo que deseo",
      "puntaje": 1
     },
     {
      "etiqueta": "Menos de lo que deseo",
      "puntaje": 2
     },
     {
      "etiqueta": "Ni mucho ni poco",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi como deseo",
      "puntaje": 4
     },
     {
      "etiqueta": "Tanto como deseo",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q6",
    "texto": "6. Tengo la posibilidad de hablar con alguien de mis problemas en el trabajo o en la casa",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho menos de lo que deseo",
      "puntaje": 1
     },
     {
      "etiqueta": "Menos de lo que deseo",
      "puntaje": 2
     },
     {
      "etiqueta": "Ni mucho ni poco",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi como deseo",
      "puntaje": 4
     },
     {
      "etiqueta": "Tanto como deseo",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q7",
    "texto": "7. Tengo la posibilidad de hablar con alguien de mis problemas personales y familiares",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho menos de lo que deseo",
      "puntaje": 1
     },
     {
      "etiqueta": "Menos de lo que deseo",
      "puntaje": 2
     },
     {
      "etiqueta": "Ni mucho ni poco",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi como deseo",
      "puntaje": 4
     },
     {
      "etiqueta": "Tanto como deseo",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q8",
    "texto": "8. Tengo la posibilidad de hablar con alguien de mis problemas económicos",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho menos de lo que deseo",
      "puntaje": 1
     },
     {
      "etiqueta": "Menos de lo que deseo",
      "puntaje": 2
     },
     {
      "etiqueta": "Ni mucho ni poco",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi como deseo",
      "puntaje": 4
     },
     {
      "etiqueta": "Tanto como deseo",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q9",
    "texto": "9. Recibo invitaciones para distraerme y salir con otras personas",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho menos de lo que deseo",
      "puntaje": 1
     },
     {
      "etiqueta": "Menos de lo que deseo",
      "puntaje": 2
     },
     {
      "etiqueta": "Ni mucho ni poco",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi como deseo",
      "puntaje": 4
     },
     {
      "etiqueta": "Tanto como deseo",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q10",
    "texto": "10. Recibo consejos útiles cuando me ocurre algún acontecimiento importante en mi vida",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho menos de lo que deseo",
      "puntaje": 1
     },
     {
      "etiqueta": "Menos de lo que deseo",
      "puntaje": 2
     },
     {
      "etiqueta": "Ni mucho ni poco",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi como deseo",
      "puntaje": 4
     },
     {
      "etiqueta": "Tanto como deseo",
      "puntaje": 5
     }
    ],
    "opcional": false
   },
   {
    "id": "q11",
    "texto": "11. Recibo ayuda cuando estoy enfermo en la cama",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Mucho menos de lo que deseo",
      "puntaje": 1
     },
     {
      "etiqueta": "Menos de lo que deseo",
      "puntaje": 2
     },
     {
      "etiqueta": "Ni mucho ni poco",
      "puntaje": 3
     },
     {
      "etiqueta": "Casi como deseo",
      "puntaje": 4
     },
     {
      "etiqueta": "Tanto como deseo",
      "puntaje": 5
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 31,
    "resultado": "Percepción baja de apoyo social"
   },
   {
    "min": 32,
    "max": 55,
    "resultado": "Percepción adecuada de apoyo social"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "fluencia-animales",
  "nombre": "Fluencia Verbal Semántica (Animales)",
  "nombreCorto": "Fluencia Verbal (Animales)",
  "categoria": "Cognitiva",
  "descripcion": "Evalúa la producción espontánea de palabras bajo la categoría 'animales' en 1 minuto. Implica procesos lingüísticos, mnésicos y ejecutivos. Los resultados están influenciados por sexo, edad, escolaridad y ocupación.",
  "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
  "tiempoAplicacion": "5 minutos aprox.",
  "aptaMovil": false,
  "razonNoApta": "Requiere cronómetro y registro manual del evaluador. Evaluación presencial con conteo de palabras en tiempo real.",
  "metodoPuntuacion": "Contar todos los nombres válidos de animales evocados en 1 minuto. Se permiten nombres de animales extintos, imaginarios o mágicos. No se consideran nombres propios, palabras incorrectas, variaciones o repeticiones.",
  "items": [
   {
    "id": "total",
    "texto": "Número de animales válidos evocados en 1 minuto",
    "tipo": "numero",
    "min": 0,
    "max": 60,
    "step": 1,
    "unidad": "animales",
    "instruccion": "Quiero que nombre palabras que pertenecen a la categoría 'animales'. Piense en cualquier animal que viva en el aire, en el agua, en el bosque, todas las clases de animales. Diga todos los animales que pueda en 1 minuto.",
    "opcional": false
   }
  ],
  "interpretacion": [],
  "cualitativa": true,
  "notaInterpretacion": "Consultar tablas normativas de fluencia verbal semántica según edad y escolaridad. No se consideran nombres propios, palabras incorrectas, variaciones o repeticiones."
 },
 {
  "id": "mini-cog",
  "nombre": "Mini-Cog",
  "nombreCorto": "Mini-Cog",
  "categoria": "Cognitiva",
  "descripcion": "Instrumento simple y rápido para detectar probable deterioro cognitivo. No tiene influencia significativa del idioma, cultura o escolaridad. Se compone de dos secciones: prueba de 3 palabras y dibujo de un reloj. Evalúa memoria, comprensión del lenguaje, habilidades visuales y motrices, funciones ejecutivas.",
  "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
  "tiempoAplicacion": "5 minutos aprox.",
  "aptaMovil": false,
  "razonNoApta": "Requiere dibujo de reloj en papel y evaluación presencial.",
  "metodoPuntuacion": "Sumar puntos de palabras (0-3) + puntos del reloj (0 o 2). Puntaje máximo: 5.",
  "rango": "0-5",
  "items": [
   {
    "id": "registro",
    "texto": "Registro de 3 palabras (no puntúa)",
    "tipo": "info",
    "seccion": "Registro de 3 palabras",
    "instruccion": "Escuche con cuidado. Voy a decir tres palabras que quiero que usted repita ahora y trate de recordar. Las palabras son: plátano, amanecer, silla. Ahora repita las palabras.",
    "nota": "Máximo 3 intentos. Otras series válidas: líder/temporada/mesa; pueblo/cocina/bebé; río/nación/dedo; capitán/jardín/retrato; hija/cielo/montaña.",
    "opcional": true
   },
   {
    "id": "reloj",
    "texto": "Dibujo del reloj",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Reloj normal (2 puntos)",
      "puntaje": 2
     },
     {
      "etiqueta": "Reloj anormal (0 puntos)",
      "puntaje": 0
     }
    ],
    "seccion": "Dibujo del reloj",
    "instruccion": "Ahora, quiero que me dibuje un reloj; primero, coloque los números donde van. Ahora coloque las manecillas del reloj en la posición que indique las 11:10.",
    "nota": "Tiempo máximo: 3 minutos.",
    "opcional": false
   },
   {
    "id": "evocacion",
    "texto": "Palabras recordadas (0-3)",
    "tipo": "numero",
    "min": 0,
    "max": 3,
    "step": 1,
    "unidad": "palabras",
    "seccion": "Evocación de 3 palabras",
    "instruccion": "¿Cuáles fueron las tres palabras que le pedí que recordara?",
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 2,
    "resultado": "Probable deterioro cognitivo, se recomienda evaluación más amplia"
   },
   {
    "min": 3,
    "max": 5,
    "resultado": "Muy poco probable que haya deterioro cognitivo"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "moca",
  "nombre": "MoCA - Evaluación Cognitiva de Montreal",
  "nombreCorto": "MoCA",
  "categoria": "Cognitiva",
  "descripcion": "Instrumento para detectar trastorno neurocognitivo leve y estadios tempranos de demencia. Evalúa: atención y concentración, funciones ejecutivas, memoria, lenguaje, habilidades visuoespaciales, razonamiento conceptual, cálculo y orientación. Probado en 14 idiomas, múltiples edades y niveles de escolaridad.",
  "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
  "tiempoAplicacion": "10 minutos aprox.",
  "aptaMovil": false,
  "razonNoApta": "Requiere formato impreso oficial MoCA con imágenes específicas, dibujos, trazo y evaluación presencial compleja.",
  "metodoPuntuacion": "Sumar puntos de todas las secciones. Puntaje máximo: 30. Si escolaridad ≤ 12 años, agregar 1 punto al total.",
  "rango": "0-30",
  "items": [
   {
    "id": "s0",
    "texto": "Visuoespacial/Ejecutiva (0-5 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 5,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Visuoespacial/Ejecutiva",
    "instruccion": "Trazo alternado números-letras (1-A-2-B-3-C-4-D-5-E) | Copia de cubo | Dibujo de reloj (11:10)",
    "opcional": false
   },
   {
    "id": "s1",
    "texto": "Identificación y nominación (0-3 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 3,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Identificación y nominación",
    "instruccion": "Nombrar 3 animales mostrados en el formato",
    "opcional": false
   },
   {
    "id": "s2",
    "texto": "Memoria (0-5 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 5,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Memoria",
    "instruccion": "Registro de 5 palabras (2 intentos) | Evocación diferida de 5 palabras",
    "opcional": false
   },
   {
    "id": "s3",
    "texto": "Atención (0-6 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 6,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Atención",
    "instruccion": "Repetición de secuencia de 5 números | Repetición inversa de números | Detección de letra objetivo | Resta serial de 7 en 7 desde 100",
    "opcional": false
   },
   {
    "id": "s4",
    "texto": "Lenguaje (0-3 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 3,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Lenguaje",
    "instruccion": "Repetición de 2 frases | Fluencia fonológica (letra P, 1 minuto)",
    "opcional": false
   },
   {
    "id": "s5",
    "texto": "Abstracción (0-2 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 2,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Abstracción",
    "instruccion": "Semejanza entre pares de palabras",
    "opcional": false
   },
   {
    "id": "s6",
    "texto": "Orientación (0-6 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 6,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Orientación",
    "instruccion": "Fecha, mes, año, día de la semana, lugar, ciudad",
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 25,
    "resultado": "Probable trastorno neurocognitivo"
   },
   {
    "min": 26,
    "max": 31,
    "resultado": "Normal"
   }
  ],
  "cualitativa": false,
  "notaInterpretacion": "Si la escolaridad es ≤ 12 años, agregar 1 punto al total (máximo 30). En la sección Memoria solo puntúa la evocación diferida (0-5)."
 },
 {
  "id": "sppb",
  "nombre": "SPPB - Batería Corta de Desempeño Físico",
  "nombreCorto": "SPPB",
  "categoria": "Marcha y Caídas",
  "descripcion": "Evalúa tres aspectos de la movilidad: equilibrio (posiciones de pies juntos, semi-tándem y tándem completo), velocidad de marcha (4 metros) y fuerza de extremidades inferiores (levantarse de silla 5 veces). Apoya la detección de riesgo de mortalidad, institucionalización, discapacidad y dependencia.",
  "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
  "tiempoAplicacion": "15 minutos aprox.",
  "aptaMovil": false,
  "razonNoApta": "Requiere evaluación presencial con silla, espacio de 4 metros, cronómetro y observación directa.",
  "metodoPuntuacion": "Sumar puntaje de equilibrio + velocidad de marcha + levantamiento de silla.",
  "rango": "0-12",
  "items": [
   {
    "id": "s0",
    "texto": "Prueba de Equilibrio (0-4 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 4,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Prueba de Equilibrio",
    "instruccion": "Pies juntos (10 segundos) | Semi-tándem (10 segundos) | Tándem completo (10 segundos)",
    "opcional": false
   },
   {
    "id": "s1",
    "texto": "Velocidad de Marcha (0-4 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 4,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Velocidad de Marcha",
    "instruccion": "Caminar 4 metros a velocidad habitual. Se realizan 2 intentos y se registra el mejor tiempo.",
    "opcional": false
   },
   {
    "id": "s2",
    "texto": "Levantamiento de Silla (0-4 puntos)",
    "tipo": "numero",
    "min": 0,
    "max": 4,
    "step": 1,
    "unidad": "puntos",
    "seccion": "Levantamiento de Silla",
    "instruccion": "Levantarse 5 veces de una silla sin usar los brazos (cruzados sobre el pecho), lo más rápido posible. Tiempo máximo: 1 minuto.",
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 7.99,
    "resultado": "Desempeño físico bajo"
   },
   {
    "min": 8,
    "max": 12,
    "resultado": "Desempeño físico adecuado"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "frail",
  "nombre": "FRAIL - Escala de Fragilidad",
  "nombreCorto": "FRAIL (Fragilidad)",
  "categoria": "Síndromes Geriátricos",
  "descripcion": "Cuestionario sencillo de 5 preguntas dicotómicas para identificar probable fragilidad. Aborda: fatiga, resistencia, desempeño aeróbico, multimorbilidad y pérdida de peso.",
  "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
  "tiempoAplicacion": "5 minutos aprox.",
  "aptaMovil": true,
  "metodoPuntuacion": "Sumar las respuestas afirmativas.",
  "rango": "0-5",
  "items": [
   {
    "id": "q1",
    "texto": "1. ¿Se siente fatigado? (Fatiga)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. ¿No puede subir un piso de escaleras? (Resistencia)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. ¿No puede caminar una cuadra? (Deambulación)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. ¿Tiene más de 5 enfermedades? (Comorbilidad)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. ¿Ha perdido más del 5% de su peso en los últimos 6 meses? (Pérdida de peso)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 0,
    "resultado": "Sin fragilidad o robustez"
   },
   {
    "min": 1,
    "max": 2,
    "resultado": "Probable pre-fragilidad"
   },
   {
    "min": 3,
    "max": 5,
    "resultado": "Probable fragilidad"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "velocidad-marcha",
  "nombre": "Velocidad de la Marcha",
  "nombreCorto": "Velocidad de la Marcha",
  "categoria": "Marcha y Caídas",
  "descripcion": "Prueba cuantitativa que determina el tiempo en que la PAM camina 4 metros. La disminución se asocia a cambios en el sistema nervioso central.",
  "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
  "tiempoAplicacion": "10 minutos aprox.",
  "aptaMovil": false,
  "razonNoApta": "Requiere espacio de 4 metros, cronómetro y evaluación presencial.",
  "metodoPuntuacion": "Velocidad = 4 metros ÷ tiempo en segundos.",
  "items": [
   {
    "id": "tiempo",
    "texto": "Tiempo para caminar 4 metros (segundos)",
    "tipo": "numero",
    "min": 0,
    "max": 120,
    "step": 0.1,
    "unidad": "segundos",
    "instruccion": "Caminar 4 metros a paso habitual. Se puede usar auxiliar de marcha si normalmente lo usa.",
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 3.99,
    "resultado": "Velocidad ≥ 1 m/seg: desempeño normal"
   },
   {
    "min": 4,
    "max": 4.99,
    "resultado": "Velocidad < 1 m/seg: predice riesgo de desenlaces adversos"
   },
   {
    "min": 5,
    "max": 10000,
    "resultado": "Velocidad < 0.8 m/seg: disminución de desempeño (componente de sarcopenia)"
   }
  ],
  "cualitativa": false,
  "notaInterpretacion": "Velocidad = 4 metros ÷ tiempo en segundos."
 },
 {
  "id": "mna-sf",
  "nombre": "MNA-SF - Mini Evaluación Nutricional (Formato Corto)",
  "nombreCorto": "MNA-SF (Nutricional)",
  "categoria": "Nutricional",
  "descripcion": "Instrumento de 7 ítems para evaluar el estado nutricional. Versión reducida del MNA que conserva precisión y validez. Validado en español para uso comunitario, hospitalario y de cuidados a largo plazo.",
  "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
  "tiempoAplicacion": "5 minutos aprox.",
  "aptaMovil": false,
  "razonNoApta": "Requiere mediciones antropométricas (peso, talla, circunferencia de pantorrilla) con equipos específicos.",
  "metodoPuntuacion": "Sumar puntos de los ítems A-E + F1 o F2 (solo uno). Puntaje máximo: 14.",
  "rango": "0-14",
  "items": [
   {
    "id": "A",
    "texto": "A. ¿Ha perdido el apetito? ¿Ha comido menos por falta de apetito, problemas digestivos o dificultades de masticación o deglución en los últimos 3 meses?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Ha comido mucho menos",
      "puntaje": 0
     },
     {
      "etiqueta": "Ha comido menos",
      "puntaje": 1
     },
     {
      "etiqueta": "Ha comido igual",
      "puntaje": 2
     }
    ],
    "opcional": false
   },
   {
    "id": "B",
    "texto": "B. Pérdida reciente de peso (< 3 meses)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Pérdida de peso > 3 kg",
      "puntaje": 0
     },
     {
      "etiqueta": "No lo sabe",
      "puntaje": 1
     },
     {
      "etiqueta": "Pérdida entre 1 y 3 kg",
      "puntaje": 2
     },
     {
      "etiqueta": "Sin pérdida de peso",
      "puntaje": 3
     }
    ],
    "opcional": false
   },
   {
    "id": "C",
    "texto": "C. Movilidad",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "De la cama al sillón",
      "puntaje": 0
     },
     {
      "etiqueta": "Autonomía en el interior",
      "puntaje": 1
     },
     {
      "etiqueta": "Sale del domicilio",
      "puntaje": 2
     }
    ],
    "opcional": false
   },
   {
    "id": "D",
    "texto": "D. ¿Ha tenido una enfermedad aguda o situación de estrés psicológico en los últimos 3 meses?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 0
     },
     {
      "etiqueta": "No",
      "puntaje": 2
     }
    ],
    "opcional": false
   },
   {
    "id": "E",
    "texto": "E. Problemas neuropsicológicos",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Demencia o depresión grave",
      "puntaje": 0
     },
     {
      "etiqueta": "Demencia moderada",
      "puntaje": 1
     },
     {
      "etiqueta": "Sin problemas psicológicos",
      "puntaje": 2
     }
    ],
    "opcional": false
   },
   {
    "id": "F1",
    "texto": "F1. Índice de masa corporal (IMC)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "IMC < 19",
      "puntaje": 0
     },
     {
      "etiqueta": "IMC 19 a < 21",
      "puntaje": 1
     },
     {
      "etiqueta": "IMC 21 a < 23",
      "puntaje": 2
     },
     {
      "etiqueta": "IMC ≥ 23",
      "puntaje": 3
     }
    ],
    "nota": "Responder F1 o F2, solo una de las dos.",
    "opcional": true
   },
   {
    "id": "F2",
    "texto": "F2. Circunferencia de pantorrilla (alternativa a F1)",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Circunferencia < 31 cm",
      "puntaje": 0
     },
     {
      "etiqueta": "Circunferencia ≥ 31 cm",
      "puntaje": 3
     }
    ],
    "nota": "Responder F1 o F2, solo una de las dos.",
    "opcional": true
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 7,
    "resultado": "Desnutrición"
   },
   {
    "min": 8,
    "max": 11,
    "resultado": "Riesgo de desnutrición"
   },
   {
    "min": 12,
    "max": 14,
    "resultado": "Estado nutricional normal"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "sarc-f",
  "nombre": "SARC-F - Cuestionario de Sarcopenia",
  "nombreCorto": "SARC-F (Sarcopenia)",
  "categoria": "Nutricional",
  "descripcion": "Cuestionario de 5 ítems validado en población mexicana (2016, Lorena Parra y cols.) para identificar probable sarcopenia. Evalúa: fuerza, asistencia para caminar, levantarse de silla, subir escaleras y caídas.",
  "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
  "tiempoAplicacion": "5 minutos aprox.",
  "aptaMovil": true,
  "metodoPuntuacion": "Sumar los puntajes de los 5 ítems.",
  "rango": "0-10",
  "items": [
   {
    "id": "q1",
    "texto": "1. ¿Qué tanta dificultad tiene para levantar y cargar 4.5 kg? (Strength (Fuerza))",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Ninguna",
      "puntaje": 0
     },
     {
      "etiqueta": "Alguna",
      "puntaje": 1
     },
     {
      "etiqueta": "Mucha o incapaz",
      "puntaje": 2
     }
    ],
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. ¿Qué tanta dificultad tiene para cruzar caminando un cuarto? (Assistance walking (Asistencia para caminar))",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Ninguna",
      "puntaje": 0
     },
     {
      "etiqueta": "Alguna",
      "puntaje": 1
     },
     {
      "etiqueta": "Mucha, usa auxiliares o incapaz",
      "puntaje": 2
     }
    ],
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. ¿Qué tanta dificultad tiene para levantarse de una silla o cama? (Rise from chair (Levantarse de silla))",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Ninguna",
      "puntaje": 0
     },
     {
      "etiqueta": "Alguna",
      "puntaje": 1
     },
     {
      "etiqueta": "Mucha o incapaz sin ayuda",
      "puntaje": 2
     }
    ],
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. ¿Qué tanta dificultad tiene para subir 10 escalones? (Climb stairs (Subir escaleras))",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Ninguna",
      "puntaje": 0
     },
     {
      "etiqueta": "Alguna",
      "puntaje": 1
     },
     {
      "etiqueta": "Mucha o incapaz",
      "puntaje": 2
     }
    ],
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. ¿Cuántas veces se ha caído en el último año? (Falls (Caídas))",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Ninguna",
      "puntaje": 0
     },
     {
      "etiqueta": "1-3 caídas",
      "puntaje": 1
     },
     {
      "etiqueta": "4 o más caídas",
      "puntaje": 2
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 3,
    "resultado": "Baja probabilidad de sarcopenia"
   },
   {
    "min": 4,
    "max": 10,
    "resultado": "Alta probabilidad de sarcopenia"
   }
  ],
  "cualitativa": false
 },
 {
  "id": "maltrato",
  "nombre": "Escala Geriátrica de Maltrato",
  "nombreCorto": "Escala de Maltrato",
  "categoria": "Social y Familiar",
  "descripcion": "Escala de 22 preguntas dividida en 5 secciones (negligencia, psicológico, físico, financiero y sexual) para detectar tipos de malos tratos en la PAM. Se aplica en privado, sin acompañantes.",
  "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
  "tiempoAplicacion": "5 minutos aprox.",
  "aptaMovil": true,
  "metodoPuntuacion": "Cada respuesta afirmativa es indicador de posible maltrato. Se debe especificar si hay o no maltrato y de qué tipo.",
  "items": [
   {
    "id": "q1",
    "texto": "1. ¿Le han dejado de proporcionar la alimentación?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Negligencia",
    "opcional": false
   },
   {
    "id": "q2",
    "texto": "2. ¿Le han dejado de proporcionar medicamentos?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Negligencia",
    "opcional": false
   },
   {
    "id": "q3",
    "texto": "3. ¿Le han dejado de proporcionar ropa o artículos de higiene?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Negligencia",
    "opcional": false
   },
   {
    "id": "q4",
    "texto": "4. ¿Le han gritado?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Maltrato psicológico",
    "opcional": false
   },
   {
    "id": "q5",
    "texto": "5. ¿Le han humillado?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Maltrato psicológico",
    "opcional": false
   },
   {
    "id": "q6",
    "texto": "6. ¿Le han amenazado?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Maltrato psicológico",
    "opcional": false
   },
   {
    "id": "q7",
    "texto": "7. ¿Le han golpeado?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Maltrato físico",
    "opcional": false
   },
   {
    "id": "q8",
    "texto": "8. ¿Le han jaloneado?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Maltrato físico",
    "opcional": false
   },
   {
    "id": "q9",
    "texto": "9. ¿Le han quitado su dinero?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Maltrato financiero/económico",
    "opcional": false
   },
   {
    "id": "q10",
    "texto": "10. ¿Le han obligado a firmar documentos?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Maltrato financiero/económico",
    "opcional": false
   },
   {
    "id": "q11",
    "texto": "11. ¿Le han tocado sin su consentimiento?",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Sí",
      "puntaje": 1
     },
     {
      "etiqueta": "No",
      "puntaje": 0
     }
    ],
    "seccion": "Maltrato sexual",
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 0,
    "resultado": "Sin indicadores de maltrato"
   },
   {
    "min": 1,
    "max": 100,
    "resultado": "Posible maltrato: revisar los dominios con respuestas afirmativas y especificar el tipo"
   }
  ],
  "cualitativa": false,
  "notaInterpretacion": "Valoración cualitativa: cada respuesta afirmativa es indicador de posible maltrato en el dominio correspondiente."
 },
 {
  "id": "susurro",
  "nombre": "Prueba del Susurro (Valoración de Agudeza Auditiva)",
  "nombreCorto": "Prueba del Susurro",
  "categoria": "Sensorial",
  "descripcion": "Evaluación de la capacidad auditiva. Se susurra una combinación de 3 números o letras a 60 cm detrás de la PAM, evaluando cada oído por separado.",
  "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
  "tiempoAplicacion": "10 minutos aprox.",
  "aptaMovil": false,
  "razonNoApta": "Requiere evaluación presencial con distancia controlada y ambiente aislado de ruido.",
  "items": [
   {
    "id": "od",
    "texto": "Oído derecho",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Repite correctamente (Adecuada)",
      "puntaje": 0
     },
     {
      "etiqueta": "No repite correctamente (Disminuida)",
      "puntaje": 1
     }
    ],
    "instruccion": "Susurrar combinación de 3 números o letras (ej: 7-6-A) a 60 cm detrás de la PAM. Evaluar cada oído por separado.",
    "opcional": false
   },
   {
    "id": "oi",
    "texto": "Oído izquierdo",
    "tipo": "opciones",
    "opciones": [
     {
      "etiqueta": "Repite correctamente (Adecuada)",
      "puntaje": 0
     },
     {
      "etiqueta": "No repite correctamente (Disminuida)",
      "puntaje": 1
     }
    ],
    "opcional": false
   }
  ],
  "interpretacion": [
   {
    "min": 0,
    "max": 0,
    "resultado": "Agudeza auditiva adecuada en ambos oídos"
   },
   {
    "min": 1,
    "max": 2,
    "resultado": "Agudeza auditiva disminuida (en uno o ambos oídos)"
   }
  ],
  "cualitativa": false
 }
];

export const TEXTO_CONSENTIMIENTO: string = "Consentimiento Informado: \"Consulta Gerontológica\"\n\nMi nombre es: ___________________________\n\nSoy estudiante de la Licenciatura en Gerontología en la Benemérita Universidad Autónoma de Puebla (BUAP).\n\nJustificación y objetivo del taller:\nEl propósito de esta consulta es promover el bienestar integral de las personas mayores a través de la enseñanza y la detección de síndromes geriátricos. Asimismo, esta actividad permite fortalecer redes de apoyo y generar espacios de convivencia significativa. Su participación contribuirá a fortalecer este tipo de intervenciones orientadas al envejecimiento activo y saludable.\n\nProcedimiento:\nSi usted decide participar, asistirá a consulta en donde valoraremos:\n- Capacidad funcional\n- Marcha y equilibrio\n- Memoria\n- Redes de apoyo\n- Nutrición\nEntre algunos otros aspectos. La duración aproximada de cada sesión será de 60 minutos.\n\nRiesgos:\nLa participación en esta consulta no representa riesgos significativos. Sin embargo, podrían presentarse molestias leves como fatiga. En caso de incomodidad, usted podrá descansar o retirarse temporalmente de la actividad.\n\nBeneficios:\nAunque no se garantiza un beneficio específico, se espera que la participación favorezca:\n- Estimulación cognitiva\n- Mejora en coordinación motora fina y gruesa\n- Reducción de estrés\n- Incremento en la socialización\n- Sensación de logro personal\n- Mejora en la salud y funcionalidad\n\nConfidencialidad y privacidad:\nToda la información recopilada será utilizada únicamente con fines académicos y de evaluación del taller. Sus datos serán manejados de manera confidencial y no se divulgará información que permita su identificación personal. En caso de tomarse fotografías para fines de difusión académica, se solicitará autorización adicional.\n\nParticipación voluntaria:\nSu participación es completamente voluntaria. Usted puede decidir no participar o retirarse en cualquier momento sin que esto implique consecuencia alguna. Si tiene dudas, puede expresarlas y se le responderán de manera clara y oportuna.\n\nConsentimiento:\nHe leído y comprendido la información anterior sobre la Consulta Gerontológica. Acepto voluntariamente participar en esta actividad.";

export function getEscala(id: string): Escala | undefined {
  return ESCALAS?.find?.((e) => e?.id === id);
}

export function calcularPuntaje(escala: Escala, respuestas: Record<string, any>): number | null {
  if (!escala) return null;
  let total = 0;
  let contestadas = 0;
  for (const item of escala?.items ?? []) {
    const r = respuestas?.[item?.id];
    if (item?.tipo === 'info') continue;
    if (r === undefined || r === null || r === '') continue;
    contestadas++;
    if (item?.tipo === 'opciones') {
      const idx = typeof r === 'number' ? r : parseInt(r, 10);
      const op = item?.opciones?.[idx];
      if (op) total += op?.puntaje ?? 0;
    } else if (item?.tipo === 'numero') {
      const v = typeof r === 'number' ? r : parseFloat(r);
      if (!isNaN(v)) total += v;
    }
  }
  if (contestadas === 0) return null;
  if (escala?.divisor) total = Math.round((total / escala.divisor) * 100) / 100;
  return Math.round(total * 100) / 100;
}

export function interpretarPuntaje(escala: Escala, puntaje: number | null): string | null {
  if (!escala || puntaje === null || puntaje === undefined) return null;
  for (const r of escala?.interpretacion ?? []) {
    if (puntaje >= (r?.min ?? 0) && puntaje <= (r?.max ?? 0)) return r?.resultado ?? null;
  }
  if (escala?.cualitativa) return 'Valoración cualitativa (ver nota de interpretación)';
  return null;
}
