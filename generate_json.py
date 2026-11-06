import json

data = {
    "consentimiento_informado": {
        "texto": (
            "Consentimiento Informado: \"Consulta Gerontológica\"\n\n"
            "Mi nombre es: ___________________________\n\n"
            "Soy estudiante de la Licenciatura en Gerontología en la Benemérita Universidad Autónoma de Puebla (BUAP).\n\n"
            "Justificación y objetivo del taller:\n"
            "El propósito de esta consulta es promover el bienestar integral de las personas mayores a través de la enseñanza y la detección de síndromes geriátricos. "
            "Asimismo, esta actividad permite fortalecer redes de apoyo y generar espacios de convivencia significativa. "
            "Su participación contribuirá a fortalecer este tipo de intervenciones orientadas al envejecimiento activo y saludable.\n\n"
            "Procedimiento:\n"
            "Si usted decide participar, asistirá a consulta en donde valoraremos:\n"
            "- Capacidad funcional\n"
            "- Marcha y equilibrio\n"
            "- Memoria\n"
            "- Redes de apoyo\n"
            "- Nutrición\n"
            "Entre algunos otros aspectos. La duración aproximada de cada sesión será de 60 minutos.\n\n"
            "Riesgos:\n"
            "La participación en esta consulta no representa riesgos significativos. Sin embargo, podrían presentarse molestias leves como fatiga. "
            "En caso de incomodidad, usted podrá descansar o retirarse temporalmente de la actividad.\n\n"
            "Beneficios:\n"
            "Aunque no se garantiza un beneficio específico, se espera que la participación favorezca:\n"
            "- Estimulación cognitiva\n"
            "- Mejora en coordinación motora fina y gruesa\n"
            "- Reducción de estrés\n"
            "- Incremento en la socialización\n"
            "- Sensación de logro personal\n"
            "- Mejora en la salud y funcionalidad\n\n"
            "Confidencialidad y privacidad:\n"
            "Toda la información recopilada será utilizada únicamente con fines académicos y de evaluación del taller. "
            "Sus datos serán manejados de manera confidencial y no se divulgará información que permita su identificación personal. "
            "En caso de tomarse fotografías para fines de difusión académica, se solicitará autorización adicional.\n\n"
            "Participación voluntaria:\n"
            "Su participación es completamente voluntaria. Usted puede decidir no participar o retirarse en cualquier momento sin que esto implique consecuencia alguna. "
            "Si tiene dudas, puede expresarlas y se le responderán de manera clara y oportuna.\n\n"
            "Consentimiento:\n"
            "He leído y comprendido la información anterior sobre la Consulta Gerontológica. Acepto voluntariamente participar en esta actividad."
        ),
        "campos_firma": [
            "Nombre completo del participante",
            "Firma del participante",
            "Fecha (dd/mm/aaaa)"
        ]
    },
    "datos_personales": {
        "campos": [
            {"nombre": "fecha_entrevista", "etiqueta": "Fecha de entrevista", "tipo": "fecha"},
            {"nombre": "nombre_completo", "etiqueta": "Nombre completo", "tipo": "texto"},
            {"nombre": "edad", "etiqueta": "Edad", "tipo": "numero"},
            {"nombre": "sexo", "etiqueta": "Sexo", "tipo": "seleccion", "opciones": ["Hombre", "Mujer", "Intersexual"]},
            {"nombre": "genero", "etiqueta": "Género", "tipo": "texto"},
            {"nombre": "fecha_nacimiento", "etiqueta": "Fecha de nacimiento", "tipo": "fecha"},
            {"nombre": "lugar_nacimiento", "etiqueta": "Lugar de nacimiento", "tipo": "texto"},
            {"nombre": "grupo_originario", "etiqueta": "¿Pertenece a un grupo originario?", "tipo": "si_no"},
            {"nombre": "lengua_indigena", "etiqueta": "¿Habla alguna lengua indígena?", "tipo": "si_no"},
            {"nombre": "estado_civil", "etiqueta": "Estado civil", "tipo": "seleccion", "opciones": ["Soltero/a", "Casado/a", "Unión libre", "Divorciado/a", "Viudo/a", "Separado/a"]},
            {"nombre": "anios_escuela", "etiqueta": "¿Cuántos años fue a la escuela?", "tipo": "numero"},
            {"nombre": "escolaridad", "etiqueta": "Escolaridad", "tipo": "texto"},
            {"nombre": "ocupacion", "etiqueta": "Ocupación actual o previa", "tipo": "texto"},
            {"nombre": "afiliacion_medica", "etiqueta": "Afiliación médica", "tipo": "seleccion", "opciones": ["Ninguna", "IMSS", "ISSSTE", "PEMEX", "SEDENA", "SEMAR", "IMSS Bienestar", "ISSFAM", "Servicios de Salud IMSS Bienestar", "Otra", "Se ignora"]},
            {"nombre": "alergias", "etiqueta": "Alergias", "tipo": "texto"},
            {"nombre": "tipo_sangre", "etiqueta": "Tipo de sangre", "tipo": "seleccion", "opciones": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]},
            {"nombre": "pension", "etiqueta": "Pensión", "tipo": "texto"},
            {"nombre": "religion", "etiqueta": "Religión (opcional)", "tipo": "texto"},
            {"nombre": "telefono", "etiqueta": "Teléfono", "tipo": "telefono"},
            {"nombre": "direccion", "etiqueta": "Dirección", "tipo": "texto"},
            {"nombre": "persona_contacto", "etiqueta": "Persona de contacto / cuidador principal (si aplica)", "tipo": "texto"},
            {"nombre": "telefono_contacto", "etiqueta": "Teléfono de contacto del usuario", "tipo": "telefono"}
        ]
    },
    "signos_vitales": {
        "campos": [
            {"nombre": "ta", "etiqueta": "TA (Tensión Arterial)", "tipo": "texto", "unidad": "mmHg"},
            {"nombre": "fr", "etiqueta": "FR (Frecuencia Respiratoria)", "tipo": "numero", "unidad": "rpm"},
            {"nombre": "fc", "etiqueta": "FC (Frecuencia Cardíaca)", "tipo": "numero", "unidad": "lpm"},
            {"nombre": "temperatura", "etiqueta": "T (Temperatura)", "tipo": "numero", "unidad": "°C"},
            {"nombre": "spo2", "etiqueta": "SpO2 (Saturación de Oxígeno)", "tipo": "numero", "unidad": "%"}
        ]
    },
    "primera_cita": {
        "preguntas": [
            {
                "seccion": "Motivo de Consulta",
                "numero": 2,
                "pregunta": "Relato en palabras de la persona mayor. ¿Por qué acude al laboratorio? ¿Qué espera?",
                "tipo": "texto_libre"
            },
            {
                "seccion": "Metas y Objetivos Personales",
                "numero": 3,
                "preguntas": [
                    "¿Qué le gustaría mejorar de su salud o bienestar?",
                    "¿Qué actividades desea seguir realizando de manera independiente?",
                    "¿Qué considera importante para su calidad de vida actualmente?",
                    "¿Qué metas tiene a corto, mediano y largo plazo?"
                ],
                "tipo": "texto_libre"
            },
            {
                "seccion": "Antecedentes Personales",
                "numero": 4,
                "preguntas": [
                    {"pregunta": "Actividad física habitual", "tipo": "texto_libre"},
                    {"pregunta": "Alimentación (percepción)", "tipo": "texto_libre"},
                    {"pregunta": "Sueño y descanso", "tipo": "texto_libre"},
                    {"pregunta": "Consumo de tabaco", "tipo": "si_no"},
                    {"pregunta": "Consumo de alcohol", "tipo": "si_no"},
                    {"pregunta": "Uso de otras sustancias", "tipo": "texto_libre"},
                    {"pregunta": "Actividades recreativas y sociales", "tipo": "texto_libre"}
                ]
            },
            {
                "seccion": "Antecedentes Personales Patológicos",
                "numero": 5,
                "preguntas": [
                    "Enfermedades crónicas diagnosticadas",
                    "Enfermedades heredofamiliares",
                    "Hospitalizaciones previas (motivo y fecha)",
                    "Cirugías previas",
                    "Vacunas en el último año",
                    "Auxiliar de funcionalidad (auditivo, marcha, visual)"
                ],
                "tipo": "texto_libre"
            },
            {
                "seccion": "Medicación Actual",
                "numero": 6,
                "campos_por_medicamento": [
                    "Medicamento",
                    "Para qué lo utiliza",
                    "Dosis",
                    "Frecuencia",
                    "Uso de medicamentos o remedios alternativos"
                ],
                "tipo": "tabla_repetible"
            },
            {
                "seccion": "Valoración Nutricional - Mediciones Antropométricas",
                "numero": 8,
                "campos": [
                    {"nombre": "circunferencia_cintura", "etiqueta": "Circunferencia cintura", "unidad": "cm"},
                    {"nombre": "circunferencia_cadera", "etiqueta": "Circunferencia cadera", "unidad": "cm"},
                    {"nombre": "circunferencia_pantorrilla", "etiqueta": "Circunferencia pantorrilla", "unidad": "cm"},
                    {"nombre": "altura_rodilla", "etiqueta": "Altura rodilla", "unidad": "cm"}
                ]
            },
            {
                "seccion": "Valoración Nutricional - Fuerza de Presión (Dinamómetro)",
                "campos": [
                    {"nombre": "dominancia", "opciones": ["Diestro", "Zurdo"]},
                    {"nombre": "intento_1", "etiqueta": "Intento 1", "unidad": "kg"},
                    {"nombre": "intento_2", "etiqueta": "Intento 2", "unidad": "kg"},
                    {"nombre": "intento_3", "etiqueta": "Intento 3", "unidad": "kg"}
                ]
            },
            {
                "seccion": "Valoración Nutricional - Bio-impedancia",
                "nota": "Contraindicaciones: Uso de marcapasos, stent metálico y placas metálicas",
                "campos": [
                    {"nombre": "peso", "etiqueta": "Peso", "unidad": "kg"},
                    {"nombre": "talla", "etiqueta": "Talla", "unidad": "cm"},
                    {"nombre": "imc", "etiqueta": "IMC", "unidad": "kg/m²"},
                    {"nombre": "masa_muscular", "etiqueta": "Masa muscular", "unidad": "kg"},
                    {"nombre": "masa_osea", "etiqueta": "Masa ósea", "unidad": "kg"},
                    {"nombre": "grasa_visceral", "etiqueta": "Grasa visceral"},
                    {"nombre": "edad_metabolica", "etiqueta": "Edad metabólica", "unidad": "años"},
                    {"nombre": "porcentaje_masa_grasa", "etiqueta": "% Masa grasa", "unidad": "%"},
                    {"nombre": "porcentaje_agua", "etiqueta": "% Agua", "unidad": "%"},
                    {"nombre": "gasto_energetico", "etiqueta": "Gasto energético", "unidad": "kcal"}
                ]
            },
            {
                "seccion": "Valoración Sensorial",
                "numero": 9,
                "campos": [
                    {"nombre": "vision_snellen", "etiqueta": "Visión Snellen", "opciones_interpretacion": ["Adecuada", "Disminuida"]},
                    {"nombre": "audicion_susurro", "etiqueta": "Audición - Prueba de susurro", "opciones_interpretacion": ["Adecuada", "Disminuida"]},
                    {"nombre": "uso_lentes_auxiliar", "etiqueta": "Uso de lentes o auxiliar auditivo", "tipo": "texto_libre"}
                ]
            },
            {
                "seccion": "Movilidad y Riesgo de Caídas",
                "numero": 10,
                "campos": [
                    {"nombre": "ayudas_tecnicas", "etiqueta": "Uso de ayudas técnicas", "opciones": ["Bastón", "Andador", "Ninguna"]},
                    {"nombre": "marcha", "etiqueta": "Marcha", "opciones": ["Estable", "Inestable"]},
                    {"nombre": "equilibrio", "etiqueta": "Equilibrio", "opciones": ["Adecuado", "Alterado"]},
                    {"nombre": "caidas_ultimo_anio", "etiqueta": "Caídas en el último año", "tipo": "si_no"},
                    {"nombre": "numero_caidas", "etiqueta": "Número de caídas", "tipo": "numero"},
                    {"nombre": "consecuencias_caidas", "etiqueta": "Consecuencias de las caídas", "tipo": "texto_libre"}
                ]
            },
            {
                "seccion": "Valoración Emocional",
                "numero": 12,
                "campos": [
                    {"nombre": "estado_animo", "etiqueta": "Estado de ánimo actual", "tipo": "texto_libre"},
                    {"nombre": "tristeza_ansiedad", "etiqueta": "Presencia de tristeza, ansiedad o apatía", "tipo": "texto_libre"},
                    {"nombre": "red_apoyo", "etiqueta": "Red de apoyo familiar y social", "tipo": "texto_libre"},
                    {"nombre": "participacion_social", "etiqueta": "Participación social", "tipo": "texto_libre"}
                ]
            },
            {
                "seccion": "Entorno y Vivienda",
                "numero": 13,
                "campos": [
                    {"nombre": "tipo_vivienda", "etiqueta": "Tipo de vivienda", "tipo": "texto_libre"},
                    {"nombre": "barreras_arquitectonicas", "etiqueta": "Barreras arquitectónicas", "tipo": "si_no"},
                    {"nombre": "seguridad_hogar", "etiqueta": "Seguridad en el hogar", "tipo": "texto_libre"}
                ]
            },
            {
                "seccion": "Actividades Sociales",
                "numero": 16,
                "preguntas": [
                    {"pregunta": "¿Asiste a algún grupo comunitario o religioso a hacer actividades?", "tipo": "si_no"},
                    {"pregunta": "¿Realiza alguna actividad como: manualidades, artesanías, pintura o música?", "tipo": "si_no"},
                    {"pregunta": "¿Realiza alguna actividad de voluntariado?", "tipo": "si_no"}
                ]
            },
            {
                "seccion": "Síndromes Geriátricos (Marcar si aplica)",
                "numero": 18,
                "opciones": ["Fragilidad", "Caídas", "Polifarmacia", "Deterioro cognitivo", "Depresión", "Incontinencia", "Inmovilidad", "Sarcopenia", "Otros"],
                "tipo": "seleccion_multiple"
            }
        ]
    },
    "escalas": [
        {
            "nombre": "Escala de Depresión Geriátrica Simplificada de 5 Preguntas (GDS-5)",
            "descripcion": "Instrumento breve de 5 preguntas para detección de síntomas depresivos en personas adultas mayores. Se evalúa según cómo se ha sentido la PAM en el último mes.",
            "fuente": "Sheikh JL, Yesavage JA. Geriatric Depression Scale: recent evidence and development of a shorter version. Clinical Gerontology 1986; 5:165-172.",
            "tiempo_aplicacion": "5 minutos aprox.",
            "preguntas": [
                {"numero": 1, "texto": "¿Está usted, básicamente satisfecho con su vida?", "respuesta_depresion": "NO"},
                {"numero": 2, "texto": "¿Siente que su vida está vacía?", "respuesta_depresion": "SI"},
                {"numero": 3, "texto": "¿Se siente aburrido frecuentemente?", "respuesta_depresion": "SI"},
                {"numero": 4, "texto": "¿Está usted preocupado o teme que algo malo le va a pasar?", "respuesta_depresion": "SI"},
                {"numero": 5, "texto": "¿Cree usted que las otras personas están mejor que usted en general?", "respuesta_depresion": "SI"}
            ],
            "opciones_respuesta": ["Sí", "No"],
            "puntuacion": {
                "metodo": "Sumar las respuestas en negritas (respuesta que indica depresión): SI=1, si=0, NO=1, no=0",
                "rango": "0-5",
                "linea_corte": 5,
                "interpretacion": [
                    {"rango": "0", "resultado": "Sin depresión"},
                    {"rango": "1-2", "resultado": "Depresión leve"},
                    {"rango": "3-4", "resultado": "Depresión moderada"},
                    {"rango": "5", "resultado": "Depresión severa"}
                ]
            },
            "apta_para_movil": True
        },
        {
            "nombre": "Escala de Depresión Geriátrica Abreviada (GDS-15)",
            "descripcion": "Escala de 15 preguntas para evaluar el estado afectivo de la PAM. Se ha probado en personas mayores sanas, enfermas o con deterioro cognitivo leve a moderado en contextos comunitario, hospitalario y de cuidados a largo plazo. Se evalúa según cómo se ha sentido la PAM en el último mes.",
            "fuente": "Sheikh JL, Yesavage JA. Geriatric Depression Scale: recent evidence and development of a shorter version. Clinical Gerontology 1986; 5:165-172.",
            "tiempo_aplicacion": "5 minutos aprox.",
            "preguntas": [
                {"numero": 1, "texto": "¿Está usted, básicamente satisfecho con su vida?", "respuesta_depresion": "NO"},
                {"numero": 2, "texto": "¿Ha disminuido o abandonado muchos de sus intereses o actividades previas?", "respuesta_depresion": "SI"},
                {"numero": 3, "texto": "¿Siente que su vida está vacía?", "respuesta_depresion": "SI"},
                {"numero": 4, "texto": "¿Se siente aburrido frecuentemente?", "respuesta_depresion": "SI"},
                {"numero": 5, "texto": "¿Está usted de buen ánimo la mayoría del tiempo?", "respuesta_depresion": "NO"},
                {"numero": 6, "texto": "¿Está usted preocupado o teme que algo malo le va a pasar?", "respuesta_depresion": "SI"},
                {"numero": 7, "texto": "¿Se siente feliz la mayor parte del tiempo?", "respuesta_depresion": "NO"},
                {"numero": 8, "texto": "¿Se siente con frecuencia desamparado?", "respuesta_depresion": "SI"},
                {"numero": 9, "texto": "¿Prefiere usted, quedarse en casa a salir a hacer cosas nuevas?", "respuesta_depresion": "SI"},
                {"numero": 10, "texto": "¿Siente usted que tiene más problemas con su memoria que otras personas de su edad?", "respuesta_depresion": "SI"},
                {"numero": 11, "texto": "¿Cree usted que es maravilloso estar vivo?", "respuesta_depresion": "NO"},
                {"numero": 12, "texto": "¿Se siente inútil o despreciable? ¿Cómo está usted actualmente?", "respuesta_depresion": "SI"},
                {"numero": 13, "texto": "¿Se siente lleno de energía?", "respuesta_depresion": "NO"},
                {"numero": 14, "texto": "¿Se encuentra sin esperanza ante su situación actual?", "respuesta_depresion": "SI"},
                {"numero": 15, "texto": "¿Cree usted que las otras personas están en general mejor que usted?", "respuesta_depresion": "SI"}
            ],
            "opciones_respuesta": ["Sí", "No"],
            "puntuacion": {
                "metodo": "Sumar las respuestas en negritas (que indican depresión). Puntaje máximo: 15.",
                "rango": "0-15",
                "linea_corte": 5,
                "interpretacion": [
                    {"rango": "0-5", "resultado": "Sin sintomatología depresiva"},
                    {"rango": "6-15", "resultado": "Con sintomatología depresiva"}
                ],
                "interpretacion_guia_inger": [
                    {"rango": "0-4", "resultado": "Normal"},
                    {"rango": "5 o más", "resultado": "Presencia de síntomas depresivos"}
                ]
            },
            "apta_para_movil": True
        },
        {
            "nombre": "Mini-Examen del Estado Mental (MMSE / Minimental de Folstein)",
            "descripcion": "Instrumento para detectar deterioro cognitivo leve o demencia. Evalúa orientación (tiempo y lugar), memoria, atención y cálculo, memoria diferida, lenguaje (denominación, repetición, comprensión verbal y escrita, escritura) y praxia constructiva. Versión adaptada y validada en población mexicana por Sandra Reyes de Beaman y colaboradores.",
            "fuente": "Folstein MF, Folstein SE, McHugh PR. Mini mental state. A practical method for grading the cognitive state of patients for the clinician. J Psychiatr Res 1975;12:189-98.",
            "tiempo_aplicacion": "10 minutos aprox.",
            "preguntas": [
                {
                    "seccion": "Orientación en Tiempo",
                    "puntos_maximos": 5,
                    "items": [
                        {"numero": 1, "texto": "¿En qué año estamos?"},
                        {"numero": 2, "texto": "¿En qué mes estamos?"},
                        {"numero": 3, "texto": "¿Qué día del mes es hoy?"},
                        {"numero": 4, "texto": "¿Qué día de la semana es hoy?"},
                        {"numero": 5, "texto": "¿Qué hora es aproximadamente?"}
                    ]
                },
                {
                    "seccion": "Orientación en Lugar",
                    "puntos_maximos": 5,
                    "items": [
                        {"numero": 1, "texto": "¿En dónde estamos ahora?"},
                        {"numero": 2, "texto": "¿En qué piso estamos?"},
                        {"numero": 3, "texto": "¿Qué colonia es esta?"},
                        {"numero": 4, "texto": "¿Qué ciudad es esta?"},
                        {"numero": 5, "texto": "¿En qué país estamos?"}
                    ]
                },
                {
                    "seccion": "Memoria (Registro)",
                    "puntos_maximos": 3,
                    "instruccion": "Le voy a decir 3 objetos. Cuando yo termine, quiero que por favor usted los repita. Máximo 3 intentos.",
                    "palabras": ["Papel", "Bicicleta", "Cuchara"]
                },
                {
                    "seccion": "Atención y Cálculo",
                    "puntos_maximos": 5,
                    "instruccion_escolaridad_alta": "Reste de 7 en 7 a partir de 100 (escolaridad > 8 años): 93, 86, 79, 72, 65",
                    "instruccion_escolaridad_baja": "Reste de 3 en 3 a partir de 20 (escolaridad < 8 años): 17, 14, 11, 8, 5",
                    "nota": "Para personas con 3 o menos años de escolaridad formal, se asignan 8 puntos directamente y no se aplican estos reactivos."
                },
                {
                    "seccion": "Memoria Diferida (Evocación)",
                    "puntos_maximos": 3,
                    "instruccion": "Dígame los 3 objetos que le mencioné al principio.",
                    "palabras": ["Papel", "Bicicleta", "Cuchara"]
                },
                {
                    "seccion": "Lenguaje - Denominación",
                    "puntos_maximos": 2,
                    "instruccion": "Muestre un reloj y pregunte: ¿Qué es esto? Muestre un lápiz y pregunte: ¿Qué es esto?"
                },
                {
                    "seccion": "Lenguaje - Repetición",
                    "puntos_maximos": 1,
                    "instruccion": "Repita esta frase (sólo una vez): 'Ni no, ni sí, ni pero'"
                },
                {
                    "seccion": "Lenguaje - Comprensión verbal (Orden secuencial)",
                    "puntos_maximos": 3,
                    "instruccion": "Dar la orden en secuencia:",
                    "ordenes": [
                        "1. Tome este papel con la mano derecha",
                        "2. Dóblelo por la mitad",
                        "3. Y déjelo en el suelo"
                    ]
                },
                {
                    "seccion": "Lenguaje - Comprensión escrita",
                    "puntos_maximos": 1,
                    "instruccion": "Muestre la orden escrita: 'CIERRE LOS OJOS'",
                    "nota": "No se aplica a personas con 3 o menos años de escolaridad."
                },
                {
                    "seccion": "Lenguaje - Escritura",
                    "puntos_maximos": 1,
                    "instruccion": "Quiero que escriba una frase que tenga sentido o coherencia.",
                    "nota": "No se aplica a personas con 3 o menos años de escolaridad."
                },
                {
                    "seccion": "Praxia constructiva - Copia de dibujo",
                    "puntos_maximos": 1,
                    "instruccion": "Copie el dibujo de dos pentágonos que se entrecruzan. La acción es correcta si los dos pentágonos se entrecruzan y debe tener 10 ángulos.",
                    "nota": "No se aplica a personas con 3 o menos años de escolaridad."
                }
            ],
            "opciones_respuesta": ["Correcto (1 punto)", "Incorrecto (0 puntos)"],
            "puntuacion": {
                "metodo": "Sumar todos los puntos. Puntaje máximo: 30. Para personas con ≤3 años de escolaridad se otorgan 8 puntos base y no se aplican 4 reactivos específicos.",
                "rango": "0-30",
                "linea_corte": 24,
                "interpretacion": [
                    {"rango": "≤23", "resultado": "Probable deterioro cognitivo (positivo)"},
                    {"rango": "≥24", "resultado": "Sin deterioro cognitivo (negativo)"}
                ]
            },
            "apta_para_movil": False,
            "razon_no_apta": "Requiere materiales físicos (reloj, lápiz, papel), dibujo de pentágonos, escritura manual y evaluación presencial de actividades motoras."
        },
        {
            "nombre": "Cuestionario de Incontinencia Urinaria",
            "descripcion": "Cuestionario breve para identificar posible trastorno en la continencia urinaria de la PAM.",
            "preguntas": [
                {"numero": 1, "texto": "¿Pierde usted orina cuando no lo desea?"},
                {"numero": 2, "texto": "¿Usa usted algún protector, toalla o paño higiénico en caso de pérdida de orina?"},
                {"numero": 3, "texto": "¿Tiene usted problemas con su vejiga, se moja sin querer?"},
                {"numero": 4, "texto": "¿Acude a menudo a orinar al baño, con mayor frecuencia en la noche?"}
            ],
            "opciones_respuesta": [
                {"valor": "Sí", "puntaje": 1},
                {"valor": "No", "puntaje": 0}
            ],
            "puntuacion": {
                "metodo": "Se suma el total. POSITIVO con 1 o más puntos (Sí); NEGATIVO cuando la sumatoria es 0.",
                "rango": "0-4",
                "interpretacion": [
                    {"rango": "0", "resultado": "Negativo (sin incontinencia)"},
                    {"rango": "1-4", "resultado": "Positivo (posible incontinencia urinaria)"}
                ]
            },
            "apta_para_movil": True
        },
        {
            "nombre": "Síndrome de Caídas (Detección)",
            "descripcion": "Pregunta única para detección del síndrome de caídas.",
            "preguntas": [
                {"numero": 1, "texto": "¿Ha presentado 2 o más caídas en el último año?"}
            ],
            "opciones_respuesta": [
                {"valor": "Sí", "puntaje": 1},
                {"valor": "No", "puntaje": 0}
            ],
            "puntuacion": {
                "interpretacion": [
                    {"rango": "No", "resultado": "Negativo"},
                    {"rango": "Sí", "resultado": "Positivo"}
                ]
            },
            "apta_para_movil": True
        },
        {
            "nombre": "INGERDESICA - Investigación Gerontológica del Riesgo para el Desarrollo del Síndrome de Caídas",
            "descripcion": "Cuestionario extenso sobre factores de riesgo en el hogar para caídas. Evalúa condiciones del hogar (pisos, iluminación, mobiliario), baño, cocina, pasillos, escaleras y calzado. CADA respuesta negativa requiere una intervención específica.",
            "fuente": "Clinical Report On Aging, Vol. 1, Modificado y adaptado por el Programa de Atención al Envejecimiento, Secretaría de Salud.",
            "preguntas": [
                {"seccion": "General", "items": [
                    "¿Los pisos y tapetes están en buenas condiciones, sin obstáculos que pudieran ocasionar tropiezos y caídas?",
                    "¿Están bien fijos los bordes de las alfombras?",
                    "¿Hay desorden en los pasillos o sitios por donde transita la persona adulta mayor?",
                    "¿La luz es adecuada? (Sin que deslumbre o produzca destellos)",
                    "¿Las luces de noche están distribuidas estratégicamente en la casa sobre todo en lugares peligrosos como las escaleras y el baño?",
                    "¿Las camas, sillas y sofás tienen la altura suficiente para permitir que la PAM se siente y levante con facilidad?",
                    "¿Los teléfonos están localizados de tal forma que las personas no tengan que apresurarse a contestarlos?",
                    "¿Los cables eléctricos se encuentran en los sitios de paso?"
                ]},
                {"seccion": "Baño", "items": [
                    "¿Para limpiar el baño se usa alfombra o adhesivo antiderrapante en la bañera o ducha?",
                    "¿Los tapetes tienen una superficie antiderrapante, sobre todo aquellos que están camino al baño?"
                ]},
                {"seccion": "Cocina", "items": [
                    "¿Los derrames se limpian pronto para evitar resbalar con ellos?",
                    "¿Los utensilios más usados se encuentran a la altura de la cintura?",
                    "¿La mesa y sillas de la cocina son firmes y seguras?"
                ]},
                {"seccion": "Pasillo", "items": [
                    "¿Hay desorden en los pasillos?",
                    "¿Permanecen apartados del camino los cables del teléfono y de otros aparatos?"
                ]},
                {"seccion": "Escalera", "items": [
                    "¿Cuentan con uno o dos pasamanos al lado de la(s) escalera(s)?",
                    "¿Se coloca cinta brillante antideslizante en el primer y último escalón?"
                ]},
                {"seccion": "Calzado", "items": [
                    "¿Tiene sus zapatos suela o tacones que eviten los deslizamientos?",
                    "¿Utiliza zapatos, zapatillas o sandalias bien ajustadas que no se salgan del pie?",
                    "¿Evita caminar descalzo?",
                    "¿Sustituye el calzado cuando se gastan y se vuelven resbaladizos?"
                ]}
            ],
            "opciones_respuesta": ["Sí", "No"],
            "puntuacion": {
                "metodo": "NO tiene línea de corte. Cada respuesta negativa requiere una intervención específica para el tópico descrito.",
                "interpretacion": "Cualitativa: cada respuesta 'No' indica un factor de riesgo que debe abordarse."
            },
            "apta_para_movil": True
        },
        {
            "nombre": "Índice de Independencia en las Actividades Básicas de la Vida Diaria (Katz)",
            "descripcion": "Evalúa la independencia de la PAM en 6 actividades básicas: bañarse, vestirse, uso del sanitario, levantarse de la cama, continencia de esfínteres y comer. Permite conocer el grado de deterioro funcional.",
            "fuente": "Branch LG, Katz S, Kniepmann K, Papsidero JA. A Prospective study of functional status among community elders. Am J Public Health 1984;74:266-268.",
            "tiempo_aplicacion": "5 minutos aprox.",
            "preguntas": [
                {
                    "actividad": "Bañarse",
                    "opciones": [
                        {"texto": "No recibe asistencia (entra y sale de la bañera por sí mismo)", "puntaje": 0},
                        {"texto": "Recibe asistencia al lavar únicamente una parte del cuerpo (espalda o una pierna)", "puntaje": 0.5},
                        {"texto": "Recibe asistencia al lavar más de una parte del cuerpo (o no se lava)", "puntaje": 1}
                    ]
                },
                {
                    "actividad": "Vestirse",
                    "opciones": [
                        {"texto": "Saca la ropa y se viste completamente sin asistencia", "puntaje": 0},
                        {"texto": "Saca la ropa y se viste con asistencia parcial", "puntaje": 0.5},
                        {"texto": "Recibe asistencia total para sacar la ropa o vestirse", "puntaje": 1}
                    ]
                },
                {
                    "actividad": "Utilizar el sanitario",
                    "opciones": [
                        {"texto": "Va al sanitario, orina y/o evacua, se lava, se arregla la ropa sin asistencia", "puntaje": 0},
                        {"texto": "Recibe asistencia para ir al sanitario o para lavarse o arreglarse la ropa tras la evacuación", "puntaje": 0.5},
                        {"texto": "Incapaz de ir al baño para el proceso de evacuación", "puntaje": 1}
                    ]
                },
                {
                    "actividad": "Levantarse de la cama",
                    "opciones": [
                        {"texto": "Se acuesta y se levanta de la cama así como de la silla sin ayuda (puede utilizar un objeto de apoyo como bastón)", "puntaje": 0},
                        {"texto": "Se acuesta y se levanta de la cama o la silla con asistencia", "puntaje": 0.5},
                        {"texto": "No se puede levantar de la cama por sí mismo", "puntaje": 1}
                    ]
                },
                {
                    "actividad": "Continencia de esfínteres",
                    "opciones": [
                        {"texto": "Controla la micción y la defecación por sí mismo y a cualquier hora del día", "puntaje": 0},
                        {"texto": "Sufre accidentes 'ocasionalmente' (incontinencia urinaria o fecal)", "puntaje": 0.5},
                        {"texto": "Usa una sonda o es incontinente urinario o fecal independientemente de la hora", "puntaje": 1}
                    ]
                },
                {
                    "actividad": "Comer",
                    "opciones": [
                        {"texto": "Come sin asistencia", "puntaje": 0},
                        {"texto": "Se alimenta solo, pero requiere asistencia para cortar la carne o untar el pan", "puntaje": 0.5},
                        {"texto": "Recibe asistencia al alimentarse o es alimentado parcial o completamente mediante sondas o líquidos endovenosos", "puntaje": 1}
                    ]
                }
            ],
            "opciones_respuesta": "Cada actividad tiene 3 niveles (0, 0.5, 1 punto)",
            "puntuacion": {
                "metodo": "Sumar los puntos parciales de las 6 actividades.",
                "rango": "0-6",
                "linea_corte": 0,
                "interpretacion": [
                    {"rango": "0", "resultado": "No hay deterioro funcional (Negativo)"},
                    {"rango": "1-2", "resultado": "Deterioro funcional leve"},
                    {"rango": "3-4", "resultado": "Deterioro funcional moderado"},
                    {"rango": "5-6", "resultado": "Deterioro funcional severo"}
                ],
                "clasificacion_alfabetica": {
                    "A": "Independencia en todas las ABVD",
                    "B": "Independencia en todas menos en una",
                    "C": "Independencia en todo menos en bañarse y otra adicional",
                    "D": "Independencia en todo menos bañarse, vestirse y otra adicional",
                    "E": "Dependencia en baño, vestido, uso del sanitario y otra adicional",
                    "F": "Dependencia en baño, vestido, uso del sanitario, transferencias y otra",
                    "G": "Dependiente en las 6 ABVD",
                    "H": "Dependencia en 2 actividades que no clasifican en C, D, E, F"
                }
            },
            "apta_para_movil": True
        },
        {
            "nombre": "Índice de Actividades Instrumentales de la Vida Diaria (Lawton & Brody)",
            "descripcion": "Evalúa la independencia en 8 actividades instrumentales: uso del teléfono, hacer compras, preparación de comida, cuidado de la casa, lavado de ropa, uso de transporte, responsabilidad con medicamentos y manejo de asuntos económicos. Detecta primeros indicios de deterioro funcional.",
            "fuente": "Lawton MP, Brody EM. Assessment of older people: Self-maintaining and instrumental activities of daily living. Gerontologist 1969;9:179-186.",
            "tiempo_aplicacion": "10 minutos aprox.",
            "preguntas": [
                {
                    "actividad": "Capacidad para usar el teléfono",
                    "opciones": [
                        {"texto": "Utiliza el teléfono por iniciativa propia", "puntaje": 1},
                        {"texto": "Es capaz de marcar bien algunos números familiares", "puntaje": 1},
                        {"texto": "Es capaz de contestar al teléfono, pero no de marcar", "puntaje": 1},
                        {"texto": "No es capaz de usar el teléfono", "puntaje": 0}
                    ]
                },
                {
                    "actividad": "Hacer compras",
                    "opciones": [
                        {"texto": "Realiza todas las compras necesarias de forma independiente", "puntaje": 1},
                        {"texto": "Realiza pequeñas compras de forma independiente", "puntaje": 0},
                        {"texto": "Necesita ir acompañado para hacer cualquier compra", "puntaje": 0},
                        {"texto": "Totalmente incapaz de comprar", "puntaje": 0}
                    ]
                },
                {
                    "actividad": "Preparación de la comida",
                    "opciones": [
                        {"texto": "Organiza, prepara y sirve las comidas adecuadamente por sí solo", "puntaje": 1},
                        {"texto": "Prepara adecuadamente las comidas si se le proporcionan los ingredientes", "puntaje": 0},
                        {"texto": "Prepara, calienta y sirve las comidas, pero no sigue una dieta adecuada", "puntaje": 0},
                        {"texto": "Necesita que le preparen y sirvan las comidas", "puntaje": 0}
                    ]
                },
                {
                    "actividad": "Cuidado de la casa",
                    "opciones": [
                        {"texto": "Mantiene la casa solo o con ayuda ocasional (para trabajos pesados)", "puntaje": 1},
                        {"texto": "Realiza tareas ligeras, como lavar los platos o hacer las camas", "puntaje": 1},
                        {"texto": "Realiza tareas ligeras, pero no puede mantener una limpieza adecuada", "puntaje": 1},
                        {"texto": "Necesita ayuda en todas las labores de la casa", "puntaje": 0},
                        {"texto": "No participa en ninguna labor de la casa", "puntaje": 0}
                    ]
                },
                {
                    "actividad": "Lavado de la ropa",
                    "opciones": [
                        {"texto": "Lava por sí solo toda la ropa", "puntaje": 1},
                        {"texto": "Lava por sí solo pequeñas prendas", "puntaje": 1},
                        {"texto": "Todo el lavado de ropa debe ser realizado por otra persona", "puntaje": 0}
                    ]
                },
                {
                    "actividad": "Uso de medios de transporte",
                    "opciones": [
                        {"texto": "Viaja solo en transporte público o conduce su propio coche", "puntaje": 1},
                        {"texto": "Es capaz de coger un taxi, pero no usa otro medio de transporte", "puntaje": 1},
                        {"texto": "Viaja en transporte público cuando va acompañado con otra persona", "puntaje": 1},
                        {"texto": "Solo utiliza el taxi o el automóvil con ayuda de otras personas", "puntaje": 0},
                        {"texto": "No viaja", "puntaje": 0}
                    ]
                },
                {
                    "actividad": "Responsabilidad respecto a sus medicamentos",
                    "opciones": [
                        {"texto": "Es capaz de tomar por sí mismo sus medicamentos a la hora indicada y con la dosis correcta", "puntaje": 1},
                        {"texto": "Toma sus medicamentos si la dosis le es preparada previamente", "puntaje": 0},
                        {"texto": "No es capaz de administrarse sus medicamentos", "puntaje": 0}
                    ]
                },
                {
                    "actividad": "Manejo de sus asuntos económicos",
                    "opciones": [
                        {"texto": "Se encarga de sus asuntos económicos por sí solo", "puntaje": 1},
                        {"texto": "Realiza las compras de cada día, pero necesita ayuda en las grandes compras, bancos, etc.", "puntaje": 1},
                        {"texto": "Incapaz de manejar dinero", "puntaje": 0}
                    ]
                }
            ],
            "opciones_respuesta": "Cada actividad se puntúa 0 o 1",
            "puntuacion": {
                "metodo": "Sumar los puntos de las 8 actividades. El máximo puede ser menor si se omiten actividades nunca realizadas por la PAM.",
                "rango": "0-8",
                "linea_corte": 7,
                "interpretacion": [
                    {"rango": "0", "resultado": "Dependiente"},
                    {"rango": "1-6", "resultado": "Semidependiente"},
                    {"rango": "7-8", "resultado": "Independiente"}
                ]
            },
            "apta_para_movil": True
        },
        {
            "nombre": "Cuestionario para Detección de Riesgo de Fracturas por Osteoporosis",
            "descripcion": "Cuestionario de 9 preguntas para personas de 50 años y más que permite identificar el riesgo de fractura por osteoporosis. El resultado se cruza con edad e IMC en la Tabla de Riesgo.",
            "fuente": "CENAPRECE, adaptación del FRAX 2023.",
            "preguntas": [
                {"numero": 1, "texto": "¿Ha tenido una fractura previa en los últimos dos años? (fractura de vértebras, fémur o cadera sin trauma severo)"},
                {"numero": 2, "texto": "¿Alguno de sus padres ha tenido fractura de cadera?"},
                {"numero": 3, "texto": "¿Fuma actualmente?"},
                {"numero": 4, "texto": "¿Utiliza glucocorticoides o los ha tomado por más de 3 meses? (Dosis mayor a 7.5 mg al día de prednisona o su equivalente)"},
                {"numero": 5, "texto": "¿Le han diagnosticado artritis reumatoide? (excepto osteoartritis)"},
                {"numero": 6, "texto": "¿Le han diagnosticado Diabetes Mellitus tipo 2?"},
                {"numero": 7, "texto": "¿Ha tenido dos o más caídas en los últimos 12 meses?"},
                {"numero": 8, "texto": "¿Presenta osteoporosis secundaria? (diabetes tipo I, osteogénesis imperfecta del adulto, hipertiroidismo no tratado, hipogonadismo o menopausia prematura <45 años, malnutrición o malabsorción crónicas o hepatopatía crónica)"},
                {"numero": 9, "texto": "¿Toma 3 o más copas diarias de alcohol? (más de 60 ml de bebidas alcohólicas)"}
            ],
            "opciones_respuesta": [
                {"valor": "Sí", "puntaje": 1},
                {"valor": "No", "puntaje": 0}
            ],
            "puntuacion": {
                "metodo": "Sumar el total y cruzar con edad e IMC en la Tabla de Riesgo de Fracturas por Osteoporosis. En caso de obtener 7-9 puntos, se considera igual a 6 para la tabla.",
                "rango": "0-9",
                "interpretacion": [
                    {"nivel": "Bajo Riesgo (B.R.)", "resultado": "Negativo"},
                    {"nivel": "Mediano Riesgo (M.R.)", "resultado": "Positivo"},
                    {"nivel": "Alto Riesgo (A.R.)", "resultado": "Positivo"}
                ],
                "nota": "Requiere tabla de referencia cruzada con edad (50-90+), sexo (H/M) e IMC (15-19, 20-24, 25-29, 30-34, 35+) para determinar el nivel de riesgo."
            },
            "apta_para_movil": False,
            "razon_no_apta": "Requiere tabla de riesgo cruzada compleja (edad × IMC × sexo × factores) para interpretar el resultado."
        },
        {
            "nombre": "Factores de Riesgo para el Desarrollo de Demencia",
            "descripcion": "Cuestionario de 12 factores que evalúa el riesgo para el desarrollo de demencia en personas de 50 años y más. Incluye factores como edad, escolaridad, sexo, presión arterial, IMC, colesterol, actividad física, tabaquismo, audición, diabetes y problemas de memoria.",
            "preguntas": [
                {"numero": 1, "texto": "¿Tiene usted 53 años o menos?", "opciones": [{"texto": "Sí (53 años o menos)", "puntaje": 0}, {"texto": "No (Mayor a 53 años)", "puntaje": 4}]},
                {"numero": 2, "texto": "¿Cuántos años escolares tiene?", "opciones": [{"texto": "10 años o más", "puntaje": 0}, {"texto": "7 a 9 años", "puntaje": 2}, {"texto": "Menos de 7 años", "puntaje": 3}]},
                {"numero": 3, "texto": "Sexo", "opciones": [{"texto": "Hombre", "puntaje": 0}, {"texto": "Mujer", "puntaje": 1}]},
                {"numero": 4, "texto": "Presión arterial sistólica", "opciones": [{"texto": "< 140 mmHg", "puntaje": 0}, {"texto": "> 140 mmHg", "puntaje": 2}]},
                {"numero": 5, "texto": "IMC", "opciones": [{"texto": "< 30 kg/m²", "puntaje": 0}, {"texto": "> 30 kg/m²", "puntaje": 2}]},
                {"numero": 6, "texto": "Colesterol total o referencia verbal", "opciones": [{"texto": "< 6.5 mmol/L (Normal)", "puntaje": 0}, {"texto": "> 6.5 mmol/L (Alto)", "puntaje": 2}]},
                {"numero": 7, "texto": "¿Realiza actividad física?", "opciones": [{"texto": "Sí", "puntaje": 0}, {"texto": "No", "puntaje": 1}]},
                {"numero": 8, "texto": "¿Vive solo?", "opciones": [{"texto": "No", "puntaje": 0}, {"texto": "Sí", "puntaje": 1}]},
                {"numero": 9, "texto": "¿Fuma actualmente?", "opciones": [{"texto": "No", "puntaje": 0}, {"texto": "Sí (<10 cigarrillos/día)", "puntaje": 1}, {"texto": "Sí (>10 cigarrillos/día)", "puntaje": 2}]},
                {"numero": 10, "texto": "¿Tiene dificultades para escuchar?", "opciones": [{"texto": "No", "puntaje": 0}, {"texto": "Sí", "puntaje": 1}]},
                {"numero": 11, "texto": "¿Padece diabetes mellitus tipo 2?", "opciones": [{"texto": "No", "puntaje": 0}, {"texto": "Sí", "puntaje": 1}]},
                {"numero": 12, "texto": "¿Tiene problemas de memoria?", "opciones": [{"texto": "No", "puntaje": 0}, {"texto": "Sí", "puntaje": 1}]}
            ],
            "opciones_respuesta": "Variable por pregunta (ver opciones individuales)",
            "puntuacion": {
                "metodo": "Sumar la totalidad de los puntos.",
                "rango": "0-20",
                "interpretacion": [
                    {"rango": "0-7", "resultado": "Bajo Riesgo"},
                    {"rango": "8-11", "resultado": "Mediano Riesgo"},
                    {"rango": "12 o más", "resultado": "Alto Riesgo"}
                ]
            },
            "apta_para_movil": True
        },
        {
            "nombre": "IQCODE - Cuestionario del Informante Sobre Deterioro Cognoscitivo en el Anciano",
            "descripcion": "Cuestionario de 16 preguntas aplicado al informante/cuidador para evaluar si la PAM ha mejorado, está igual o ha empeorado en comparación con hace 10 años. Evalúa memoria, aprendizaje, toma de decisiones y manejo financiero.",
            "fuente": "CONAEN. Guía de consulta para el Médico de Primer Nivel de Atención. Alteraciones en la Memoria de la Persona Adulta Mayor, 2010. CENAPRECE.",
            "preguntas": [
                {"numero": 1, "texto": "Recuerda cosas relacionadas con sus familiares y amigos (cumpleaños, ocupación, direcciones)"},
                {"numero": 2, "texto": "Recuerda cosas que han pasado recientemente"},
                {"numero": 3, "texto": "Recuerda conversaciones recientes pocos días después"},
                {"numero": 4, "texto": "Recuerda su dirección y número de teléfono"},
                {"numero": 5, "texto": "Recuerda en qué día y mes estamos hoy"},
                {"numero": 6, "texto": "Recuerda dónde guarda usualmente las cosas"},
                {"numero": 7, "texto": "Recuerda dónde encontrar las cosas que han sido guardadas en un lugar distinto al usual"},
                {"numero": 8, "texto": "Sabe cómo utilizar nuevas máquinas de uso doméstico (licuadora, TV, radio)"},
                {"numero": 9, "texto": "Aprende a utilizar nuevas máquinas de uso doméstico"},
                {"numero": 10, "texto": "En general aprende cosas nuevas"},
                {"numero": 11, "texto": "Sigue la historia de un libro o de una telenovela"},
                {"numero": 12, "texto": "Toma decisiones en asuntos de la vida diaria"},
                {"numero": 13, "texto": "Maneja el dinero de sus compras"},
                {"numero": 14, "texto": "Maneja asuntos financieros (cobros de pensión, trámites bancarios)"},
                {"numero": 15, "texto": "Resuelve cálculos matemáticos sencillos relacionados con la vida diaria (porciones adecuadas de comida)"},
                {"numero": 16, "texto": "Usa su inteligencia para entender qué está pasando y razona las cosas"}
            ],
            "opciones_respuesta": [
                {"valor": "Mucho mejor", "puntaje": 1},
                {"valor": "Un poco mejor", "puntaje": 2},
                {"valor": "No ha cambiado mucho", "puntaje": 3},
                {"valor": "Un poco peor", "puntaje": 4},
                {"valor": "Francamente peor", "puntaje": 5}
            ],
            "puntuacion": {
                "metodo": "Sumar el total de puntaje y dividir entre 16.",
                "rango": "1.0 - 5.0",
                "linea_corte": 3.5,
                "interpretacion": [
                    {"rango": "< 3.5", "resultado": "Sin deterioro cognitivo probable"},
                    {"rango": "≥ 3.5", "resultado": "Probable deterioro cognitivo"}
                ]
            },
            "apta_para_movil": True
        },
        {
            "nombre": "Prueba Levántate y Anda (Timed Up and Go / Get Up and Go)",
            "descripcion": "Prueba cronometrada que evalúa la movilidad básica y probables trastornos de la marcha y balance. La PAM debe levantarse de una silla, caminar 3 metros, regresar y sentarse. Evalúa estabilidad postural y longitud del paso.",
            "fuente": "Mathias S, Nayak USL, Isaac B. Balance in elderly patients: the 'Get Up and Go' Test. Arch Phys Med Rehabil 1986;67:387-389.",
            "tiempo_aplicacion": "10 minutos aprox.",
            "preguntas": [
                {"instruccion": "1. Levantarse de la silla"},
                {"instruccion": "2. Caminar 3 metros (en línea)"},
                {"instruccion": "3. Caminar de regreso a la silla"},
                {"instruccion": "4. Sentarse"}
            ],
            "opciones_respuesta": "Medición en segundos",
            "puntuacion": {
                "metodo": "Medir el tiempo total en segundos desde que se levanta hasta que se sienta.",
                "linea_corte": "19 segundos (Formatos) / 13 segundos (Guía INGER)",
                "interpretacion_formatos": [
                    {"rango": "< 20 segundos", "resultado": "Normal"},
                    {"rango": "> 20 segundos", "resultado": "Anormal"}
                ],
                "interpretacion_guia_inger": [
                    {"rango": "< 10 segundos", "resultado": "Normal"},
                    {"rango": "11-13 segundos", "resultado": "Discapacidad leve de la movilidad"},
                    {"rango": "> 13 segundos", "resultado": "Riesgo elevado de caídas"}
                ]
            },
            "apta_para_movil": False,
            "razon_no_apta": "Requiere evaluación presencial con silla, espacio de 3 metros y cronómetro."
        },
        {
            "nombre": "Cuestionario de Sobrecarga del Cuidador (Zarit & Zarit)",
            "descripcion": "Escala de 22 preguntas para detectar sobrecarga en el cuidador de la PAM. Evalúa aspectos de carga emocional, social, económica y de salud del cuidador.",
            "fuente": "Zarit SH. Predictors of outcome among day care participants. Long Term Care Health Serv Adm Q. 1978;2(2):150-162.",
            "preguntas": [
                {"numero": 1, "texto": "¿Piensa que la persona que cuida le pide más ayuda de la que realmente necesita?"},
                {"numero": 2, "texto": "¿Piensa que debido a las horas que le dedica a la persona que cuida no tiene suficiente tiempo para usted?"},
                {"numero": 3, "texto": "¿Se siente agobiado por intentar compatibilizar el cuidado de la persona que atiende con otras responsabilidades (trabajo, familia)?"},
                {"numero": 4, "texto": "¿Siente vergüenza por la conducta de la persona que cuida?"},
                {"numero": 5, "texto": "¿Se siente enfadado cuando está cerca de la persona que cuida?"},
                {"numero": 6, "texto": "¿Piensa que el cuidar a la persona que usted atiende afecta negativamente la relación que tiene con otros miembros de la familia?"},
                {"numero": 7, "texto": "¿Tiene miedo por el futuro de la persona que cuida?"},
                {"numero": 8, "texto": "¿Piensa que la persona que cuida depende de usted?"},
                {"numero": 9, "texto": "¿Se siente tenso cuando está cerca de la persona que cuida?"},
                {"numero": 10, "texto": "¿Piensa que su salud ha empeorado debido a la tarea o trabajo de cuidador?"},
                {"numero": 11, "texto": "¿Piensa que no tiene tanta intimidad como le gustaría debido a la tarea o trabajo de cuidador?"},
                {"numero": 12, "texto": "¿Piensa que su vida social se ha visto afectada de manera negativa por tener que fungir como cuidador?"},
                {"numero": 13, "texto": "¿Se siente incómodo por distanciarse de sus amistades por ser cuidador?"},
                {"numero": 14, "texto": "¿Piensa que la persona que atiende considera que sólo usted la puede cuidar?"},
                {"numero": 15, "texto": "¿Piensa que no tiene suficientes ingresos económicos para fungir como cuidador?"},
                {"numero": 16, "texto": "¿Piensa que no será capaz de fungir como cuidador por mucho más tiempo?"},
                {"numero": 17, "texto": "¿Siente que ha perdido el control de su vida desde que comenzó a fungir como cuidador?"},
                {"numero": 18, "texto": "¿Desearía dejar de fungir como cuidador?"},
                {"numero": 19, "texto": "¿Se siente indeciso sobre qué hacer con la persona que cuida?"},
                {"numero": 20, "texto": "¿Piensa que debería hacer más por la persona que cuida?"},
                {"numero": 21, "texto": "¿Piensa que podría cuidar mejor a la persona que atiende?"},
                {"numero": 22, "texto": "¿Qué tan frecuentemente experimenta el ser cuidador como una carga?"}
            ],
            "opciones_respuesta": [
                {"valor": "Nunca", "puntaje": 0},
                {"valor": "Rara vez", "puntaje": 1},
                {"valor": "Algunas veces", "puntaje": 2},
                {"valor": "Bastantes veces", "puntaje": 3},
                {"valor": "Casi siempre", "puntaje": 4}
            ],
            "puntuacion": {
                "metodo": "Sumar el puntaje total de las 22 preguntas.",
                "rango": "0-88",
                "linea_corte": 47,
                "interpretacion": [
                    {"rango": "< 47", "resultado": "No se encuentra en sobrecarga"},
                    {"rango": "47-55", "resultado": "Sobrecarga leve"},
                    {"rango": "> 55", "resultado": "Sobrecarga intensa"}
                ]
            },
            "apta_para_movil": True
        },
        {
            "nombre": "APGAR Familiar",
            "descripcion": "Cuestionario de 7 preguntas para evaluar la funcionalidad familiar percibida por la PAM. Evalúa adaptabilidad, participación, crecimiento, afecto y resolución de la familia, además de apoyo de amigos.",
            "fuente": "Bellon JA, Delgado A, Luna del Castillo JD, Lardelli P. Validez y fiabilidad del cuestionario de función familiar APGAR-familiar. Aten Primaria 1987;18(6):289-96.",
            "preguntas": [
                {"numero": 1, "texto": "Me satisface la ayuda que recibo de mi familia cuando tengo un problema y/o necesidad."},
                {"numero": 2, "texto": "Me satisface como en mi familia hablamos y compartimos nuestros problemas."},
                {"numero": 3, "texto": "Me satisface cómo mi familia acepta y apoya mis deseos de emprender nuevas actividades."},
                {"numero": 4, "texto": "Me satisface cómo mi familia expresa afecto y responde a mis emociones tales como rabia, tristeza, amor."},
                {"numero": 5, "texto": "Me satisface cómo compartimos en mi familia el tiempo para estar juntos, los espacios en la casa y el dinero."},
                {"numero": 6, "texto": "¿Usted tiene algún amigo(a) cercano(a) a quien pueda buscar cuando necesita ayuda?"},
                {"numero": 7, "texto": "Estoy satisfecho(a) con el soporte que recibo de mis amigas o amigos."}
            ],
            "opciones_respuesta": [
                {"valor": "Nunca", "puntaje": 0},
                {"valor": "Casi nunca", "puntaje": 1},
                {"valor": "Algunas veces", "puntaje": 2},
                {"valor": "Casi siempre", "puntaje": 3},
                {"valor": "Siempre", "puntaje": 4}
            ],
            "puntuacion": {
                "metodo": "Sumar el total de las 7 preguntas.",
                "rango": "0-28",
                "linea_corte": 18,
                "interpretacion": [
                    {"rango": "18-20", "resultado": "Buena función familiar"},
                    {"rango": "14-17", "resultado": "Disfunción familiar leve"},
                    {"rango": "10-13", "resultado": "Disfunción familiar moderada"},
                    {"rango": "9 o menos", "resultado": "Disfunción familiar severa"}
                ]
            },
            "apta_para_movil": True
        },
        {
            "nombre": "Cuestionario de Apoyo Social Percibido (DUKE-UNC)",
            "descripcion": "Cuestionario de 11 preguntas para evaluar el apoyo social percibido por la PAM. Evalúa apoyo confidencial y afectivo.",
            "fuente": "Broadhead WE, Gehlbach SH, DeGruy FV, Kaplan BH. The Duke-UNC Functional Social Support Questionnaire: measurement of social support in family medicine patients. Med Care 1988;26:709-23.",
            "preguntas": [
                {"numero": 1, "texto": "Recibo visitas de mis amigos y familiares"},
                {"numero": 2, "texto": "Recibo ayuda en asuntos relacionados con mi casa"},
                {"numero": 3, "texto": "Recibo elogios y reconocimientos cuando hago bien mi trabajo"},
                {"numero": 4, "texto": "Cuento con personas que se preocupan de lo que me sucede"},
                {"numero": 5, "texto": "Recibo amor y afecto"},
                {"numero": 6, "texto": "Tengo la posibilidad de hablar con alguien de mis problemas en el trabajo o en la casa"},
                {"numero": 7, "texto": "Tengo la posibilidad de hablar con alguien de mis problemas personales y familiares"},
                {"numero": 8, "texto": "Tengo la posibilidad de hablar con alguien de mis problemas económicos"},
                {"numero": 9, "texto": "Recibo invitaciones para distraerme y salir con otras personas"},
                {"numero": 10, "texto": "Recibo consejos útiles cuando me ocurre algún acontecimiento importante en mi vida"},
                {"numero": 11, "texto": "Recibo ayuda cuando estoy enfermo en la cama"}
            ],
            "opciones_respuesta": [
                {"valor": "Mucho menos de lo que deseo", "puntaje": 1},
                {"valor": "Menos de lo que deseo", "puntaje": 2},
                {"valor": "Ni mucho ni poco", "puntaje": 3},
                {"valor": "Casi como deseo", "puntaje": 4},
                {"valor": "Tanto como deseo", "puntaje": 5}
            ],
            "puntuacion": {
                "metodo": "Sumar el total de las 11 preguntas.",
                "rango": "11-55",
                "linea_corte": 32,
                "interpretacion": [
                    {"rango": "≤ 31", "resultado": "Percepción baja de apoyo social"},
                    {"rango": "≥ 32", "resultado": "Percepción adecuada de apoyo social"}
                ]
            },
            "apta_para_movil": True
        },
        {
            "nombre": "Fluencia Verbal Semántica (Animales)",
            "descripcion": "Evalúa la producción espontánea de palabras bajo la categoría 'animales' en 1 minuto. Implica procesos lingüísticos, mnésicos y ejecutivos. Los resultados están influenciados por sexo, edad, escolaridad y ocupación.",
            "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
            "tiempo_aplicacion": "5 minutos aprox.",
            "preguntas": [
                {"instruccion": "Quiero que nombre palabras que pertenecen a la categoría 'animales'. Piense en cualquier animal que viva en el aire, en el agua, en el bosque, todas las clases de animales. Diga todos los animales que pueda en 1 minuto."}
            ],
            "opciones_respuesta": "Registro libre de nombres de animales evocados en 1 minuto",
            "puntuacion": {
                "metodo": "Contar todos los nombres válidos de animales evocados en 1 minuto. Se permiten nombres de animales extintos, imaginarios o mágicos. No se consideran nombres propios, palabras incorrectas, variaciones o repeticiones.",
                "interpretacion": "Consultar tablas normativas de fluencia verbal semántica según edad y escolaridad."
            },
            "apta_para_movil": False,
            "razon_no_apta": "Requiere cronómetro y registro manual del evaluador. Evaluación presencial con conteo de palabras en tiempo real."
        },
        {
            "nombre": "Mini-Cog",
            "descripcion": "Instrumento simple y rápido para detectar probable deterioro cognitivo. No tiene influencia significativa del idioma, cultura o escolaridad. Se compone de dos secciones: prueba de 3 palabras y dibujo de un reloj. Evalúa memoria, comprensión del lenguaje, habilidades visuales y motrices, funciones ejecutivas.",
            "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
            "tiempo_aplicacion": "5 minutos aprox.",
            "preguntas": [
                {
                    "seccion": "Registro de 3 palabras",
                    "instruccion": "Escuche con cuidado. Voy a decir tres palabras que quiero que usted repita ahora y trate de recordar. Las palabras son: plátano, amanecer, silla. Ahora repita las palabras.",
                    "nota": "Máximo 3 intentos. Otras series válidas: líder/temporada/mesa; pueblo/cocina/bebé; río/nación/dedo; capitán/jardín/retrato; hija/cielo/montaña."
                },
                {
                    "seccion": "Dibujo del reloj",
                    "instruccion": "Ahora, quiero que me dibuje un reloj; primero, coloque los números donde van. Ahora coloque las manecillas del reloj en la posición que indique las 11:10.",
                    "nota": "Tiempo máximo: 3 minutos."
                },
                {
                    "seccion": "Evocación de 3 palabras",
                    "instruccion": "¿Cuáles fueron las tres palabras que le pedí que recordara?"
                }
            ],
            "opciones_respuesta": "Palabras: 0-3 puntos (1 por palabra). Reloj: 0 o 2 puntos (normal=2, anormal=0).",
            "puntuacion": {
                "metodo": "Sumar puntos de palabras (0-3) + puntos del reloj (0 o 2). Puntaje máximo: 5.",
                "rango": "0-5",
                "interpretacion": [
                    {"rango": "0-2", "resultado": "Probable deterioro cognitivo, se recomienda evaluación más amplia"},
                    {"rango": "3-5", "resultado": "Muy poco probable que haya deterioro cognitivo"}
                ]
            },
            "apta_para_movil": False,
            "razon_no_apta": "Requiere dibujo de reloj en papel y evaluación presencial."
        },
        {
            "nombre": "MoCA - Evaluación Cognitiva de Montreal",
            "descripcion": "Instrumento para detectar trastorno neurocognitivo leve y estadios tempranos de demencia. Evalúa: atención y concentración, funciones ejecutivas, memoria, lenguaje, habilidades visuoespaciales, razonamiento conceptual, cálculo y orientación. Probado en 14 idiomas, múltiples edades y niveles de escolaridad.",
            "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
            "tiempo_aplicacion": "10 minutos aprox.",
            "preguntas": [
                {"seccion": "Visuoespacial/Ejecutiva", "items": ["Trazo alternado números-letras (1-A-2-B-3-C-4-D-5-E)", "Copia de cubo", "Dibujo de reloj (11:10)"]},
                {"seccion": "Identificación y nominación", "items": ["Nombrar 3 animales mostrados en el formato"]},
                {"seccion": "Memoria", "items": ["Registro de 5 palabras (2 intentos)", "Evocación diferida de 5 palabras"]},
                {"seccion": "Atención", "items": ["Repetición de secuencia de 5 números", "Repetición inversa de números", "Detección de letra objetivo", "Resta serial de 7 en 7 desde 100"]},
                {"seccion": "Lenguaje", "items": ["Repetición de 2 frases", "Fluencia fonológica (letra P, 1 minuto)"]},
                {"seccion": "Abstracción", "items": ["Semejanza entre pares de palabras"]},
                {"seccion": "Orientación", "items": ["Fecha, mes, año, día de la semana, lugar, ciudad"]}
            ],
            "opciones_respuesta": "Variable según sección (ver formato oficial MoCA)",
            "puntuacion": {
                "metodo": "Sumar puntos de todas las secciones. Puntaje máximo: 30. Si escolaridad ≤ 12 años, agregar 1 punto al total.",
                "rango": "0-30",
                "linea_corte": 26,
                "interpretacion": [
                    {"rango": "≥ 26", "resultado": "Normal"},
                    {"rango": "< 26", "resultado": "Probable trastorno neurocognitivo"}
                ]
            },
            "apta_para_movil": False,
            "razon_no_apta": "Requiere formato impreso oficial MoCA con imágenes específicas, dibujos, trazo y evaluación presencial compleja."
        },
        {
            "nombre": "SPPB - Batería Corta de Desempeño Físico",
            "descripcion": "Evalúa tres aspectos de la movilidad: equilibrio (posiciones de pies juntos, semi-tándem y tándem completo), velocidad de marcha (4 metros) y fuerza de extremidades inferiores (levantarse de silla 5 veces). Apoya la detección de riesgo de mortalidad, institucionalización, discapacidad y dependencia.",
            "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
            "tiempo_aplicacion": "15 minutos aprox.",
            "preguntas": [
                {
                    "seccion": "Prueba de Equilibrio",
                    "puntos_maximos": 4,
                    "items": [
                        {"posicion": "Pies juntos", "duracion": "10 segundos"},
                        {"posicion": "Semi-tándem", "duracion": "10 segundos"},
                        {"posicion": "Tándem completo", "duracion": "10 segundos"}
                    ]
                },
                {
                    "seccion": "Velocidad de Marcha",
                    "puntos_maximos": 4,
                    "instruccion": "Caminar 4 metros a velocidad habitual. Se realizan 2 intentos y se registra el mejor tiempo."
                },
                {
                    "seccion": "Levantamiento de Silla",
                    "puntos_maximos": 4,
                    "instruccion": "Levantarse 5 veces de una silla sin usar los brazos (cruzados sobre el pecho), lo más rápido posible. Tiempo máximo: 1 minuto."
                }
            ],
            "opciones_respuesta": "Medición en segundos para cada prueba, convertida a puntaje 0-4",
            "puntuacion": {
                "metodo": "Sumar puntaje de equilibrio + velocidad de marcha + levantamiento de silla.",
                "rango": "0-12",
                "interpretacion": [
                    {"rango": "< 8", "resultado": "Desempeño físico bajo"},
                    {"rango": "8-12", "resultado": "Desempeño físico adecuado"}
                ]
            },
            "apta_para_movil": False,
            "razon_no_apta": "Requiere evaluación presencial con silla, espacio de 4 metros, cronómetro y observación directa."
        },
        {
            "nombre": "FRAIL - Escala de Fragilidad",
            "descripcion": "Cuestionario sencillo de 5 preguntas dicotómicas para identificar probable fragilidad. Aborda: fatiga, resistencia, desempeño aeróbico, multimorbilidad y pérdida de peso.",
            "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
            "tiempo_aplicacion": "5 minutos aprox.",
            "preguntas": [
                {"numero": 1, "componente": "Fatiga", "texto": "¿Se siente fatigado?"},
                {"numero": 2, "componente": "Resistencia", "texto": "¿No puede subir un piso de escaleras?"},
                {"numero": 3, "componente": "Deambulación", "texto": "¿No puede caminar una cuadra?"},
                {"numero": 4, "componente": "Comorbilidad", "texto": "¿Tiene más de 5 enfermedades?"},
                {"numero": 5, "componente": "Pérdida de peso", "texto": "¿Ha perdido más del 5% de su peso en los últimos 6 meses?"}
            ],
            "opciones_respuesta": [
                {"valor": "Sí", "puntaje": 1},
                {"valor": "No", "puntaje": 0}
            ],
            "puntuacion": {
                "metodo": "Sumar las respuestas afirmativas.",
                "rango": "0-5",
                "interpretacion": [
                    {"rango": "0", "resultado": "Sin fragilidad o robustez"},
                    {"rango": "1-2", "resultado": "Probable pre-fragilidad"},
                    {"rango": "3-5", "resultado": "Probable fragilidad"}
                ]
            },
            "apta_para_movil": True
        },
        {
            "nombre": "Velocidad de la Marcha",
            "descripcion": "Prueba cuantitativa que determina el tiempo en que la PAM camina 4 metros. La disminución se asocia a cambios en el sistema nervioso central.",
            "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
            "tiempo_aplicacion": "10 minutos aprox.",
            "preguntas": [
                {"instruccion": "Caminar 4 metros a paso habitual. Se puede usar auxiliar de marcha si normalmente lo usa."}
            ],
            "opciones_respuesta": "Medición en segundos y cálculo de velocidad (m/seg)",
            "puntuacion": {
                "metodo": "Velocidad = 4 metros ÷ tiempo en segundos.",
                "interpretacion": [
                    {"rango": "< 1 m/seg (≥ 4 seg)", "resultado": "Predice riesgo de desenlaces adversos"},
                    {"rango": "< 0.8 m/seg (≥ 5 seg)", "resultado": "Disminución de desempeño (componente de sarcopenia)"}
                ]
            },
            "apta_para_movil": False,
            "razon_no_apta": "Requiere espacio de 4 metros, cronómetro y evaluación presencial."
        },
        {
            "nombre": "MNA-SF - Mini Evaluación Nutricional (Formato Corto)",
            "descripcion": "Instrumento de 7 ítems para evaluar el estado nutricional. Versión reducida del MNA que conserva precisión y validez. Validado en español para uso comunitario, hospitalario y de cuidados a largo plazo.",
            "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
            "tiempo_aplicacion": "5 minutos aprox.",
            "preguntas": [
                {"item": "A", "texto": "¿Ha perdido el apetito? ¿Ha comido menos por falta de apetito, problemas digestivos o dificultades de masticación o deglución en los últimos 3 meses?"},
                {"item": "B", "texto": "Pérdida reciente de peso (< 3 meses)"},
                {"item": "C", "texto": "Movilidad"},
                {"item": "D", "texto": "¿Ha tenido una enfermedad aguda o situación de estrés psicológico en los últimos 3 meses?"},
                {"item": "E", "texto": "Problemas neuropsicológicos"},
                {"item": "F1", "texto": "Índice de masa corporal (IMC)"},
                {"item": "F2", "texto": "Circunferencia de pantorrilla (alternativa a F1)"}
            ],
            "opciones_respuesta": "Variable según ítem (ver formato MNA-SF oficial)",
            "puntuacion": {
                "metodo": "Sumar puntos de los ítems A-E + F1 o F2 (solo uno). Puntaje máximo: 14.",
                "rango": "0-14",
                "interpretacion": [
                    {"rango": "12-14", "resultado": "Estado nutricional normal"},
                    {"rango": "8-11", "resultado": "Riesgo de desnutrición"},
                    {"rango": "0-7", "resultado": "Desnutrición"}
                ]
            },
            "apta_para_movil": False,
            "razon_no_apta": "Requiere mediciones antropométricas (peso, talla, circunferencia de pantorrilla) con equipos específicos."
        },
        {
            "nombre": "SARC-F - Cuestionario de Sarcopenia",
            "descripcion": "Cuestionario de 5 ítems validado en población mexicana (2016, Lorena Parra y cols.) para identificar probable sarcopenia. Evalúa: fuerza, asistencia para caminar, levantarse de silla, subir escaleras y caídas.",
            "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
            "tiempo_aplicacion": "5 minutos aprox.",
            "preguntas": [
                {"componente": "Strength (Fuerza)", "texto": "¿Qué tanta dificultad tiene para levantar y cargar 4.5 kg?", "opciones": [{"texto": "Ninguna", "puntaje": 0}, {"texto": "Alguna", "puntaje": 1}, {"texto": "Mucha o incapaz", "puntaje": 2}]},
                {"componente": "Assistance walking (Asistencia para caminar)", "texto": "¿Qué tanta dificultad tiene para cruzar caminando un cuarto?", "opciones": [{"texto": "Ninguna", "puntaje": 0}, {"texto": "Alguna", "puntaje": 1}, {"texto": "Mucha, usa auxiliares o incapaz", "puntaje": 2}]},
                {"componente": "Rise from chair (Levantarse de silla)", "texto": "¿Qué tanta dificultad tiene para levantarse de una silla o cama?", "opciones": [{"texto": "Ninguna", "puntaje": 0}, {"texto": "Alguna", "puntaje": 1}, {"texto": "Mucha o incapaz sin ayuda", "puntaje": 2}]},
                {"componente": "Climb stairs (Subir escaleras)", "texto": "¿Qué tanta dificultad tiene para subir 10 escalones?", "opciones": [{"texto": "Ninguna", "puntaje": 0}, {"texto": "Alguna", "puntaje": 1}, {"texto": "Mucha o incapaz", "puntaje": 2}]},
                {"componente": "Falls (Caídas)", "texto": "¿Cuántas veces se ha caído en el último año?", "opciones": [{"texto": "Ninguna", "puntaje": 0}, {"texto": "1-3 caídas", "puntaje": 1}, {"texto": "4 o más caídas", "puntaje": 2}]}
            ],
            "opciones_respuesta": "0, 1 o 2 puntos por ítem",
            "puntuacion": {
                "metodo": "Sumar los puntajes de los 5 ítems.",
                "rango": "0-10",
                "linea_corte": 4,
                "interpretacion": [
                    {"rango": "0-3", "resultado": "Baja probabilidad de sarcopenia"},
                    {"rango": "4 o más", "resultado": "Alta probabilidad de sarcopenia"}
                ]
            },
            "apta_para_movil": True
        },
        {
            "nombre": "Escala Geriátrica de Maltrato",
            "descripcion": "Escala de 22 preguntas dividida en 5 secciones (negligencia, psicológico, físico, financiero y sexual) para detectar tipos de malos tratos en la PAM. Se aplica en privado, sin acompañantes.",
            "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
            "tiempo_aplicacion": "5 minutos aprox.",
            "preguntas": [
                {"seccion": "Negligencia", "items_ejemplo": ["¿Le han dejado de proporcionar la alimentación?", "¿Le han dejado de proporcionar medicamentos?", "¿Le han dejado de proporcionar ropa o artículos de higiene?"]},
                {"seccion": "Maltrato psicológico", "items_ejemplo": ["¿Le han gritado?", "¿Le han humillado?", "¿Le han amenazado?"]},
                {"seccion": "Maltrato físico", "items_ejemplo": ["¿Le han golpeado?", "¿Le han jaloneado?"]},
                {"seccion": "Maltrato financiero/económico", "items_ejemplo": ["¿Le han quitado su dinero?", "¿Le han obligado a firmar documentos?"]},
                {"seccion": "Maltrato sexual", "items_ejemplo": ["¿Le han tocado sin su consentimiento?"]}
            ],
            "opciones_respuesta": ["Sí", "No"],
            "puntuacion": {
                "metodo": "Cada respuesta afirmativa es indicador de posible maltrato. Se debe especificar si hay o no maltrato y de qué tipo.",
                "interpretacion": "Cualitativa: respuesta afirmativa indica posible maltrato en el dominio correspondiente."
            },
            "apta_para_movil": True
        },
        {
            "nombre": "Prueba del Susurro (Valoración de Agudeza Auditiva)",
            "descripcion": "Evaluación de la capacidad auditiva. Se susurra una combinación de 3 números o letras a 60 cm detrás de la PAM, evaluando cada oído por separado.",
            "fuente": "Guía de Instrumentos de Evaluación Geriátrica Integral, INGER 2020.",
            "tiempo_aplicacion": "10 minutos aprox.",
            "preguntas": [
                {"instruccion": "Susurrar combinación de 3 números o letras (ej: 7-6-A) a 60 cm detrás de la PAM. Evaluar cada oído por separado."}
            ],
            "opciones_respuesta": "Repetición correcta o incorrecta de la combinación",
            "puntuacion": {
                "interpretacion": [
                    {"resultado": "Adecuada", "criterio": "Repite correctamente la combinación"},
                    {"resultado": "Disminuida", "criterio": "No repite correctamente"}
                ]
            },
            "apta_para_movil": False,
            "razon_no_apta": "Requiere evaluación presencial con distancia controlada y ambiente aislado de ruido."
        }
    ],
    "notas_clinicas": {
        "estructura": {
            "secciones": [
                {"numero": 7, "nombre": "Valoración Funcional", "escalas": ["Barthel (ABVD)", "Lawton & Brody (AIVD)"]},
                {"numero": 8, "nombre": "Valoración Nutricional", "escalas": ["MNA (MiniNutritional)"], "campos_adicionales": ["Mediciones antropométricas", "Fuerza de presión (Dinamómetro)", "Bio-impedancia"]},
                {"numero": 9, "nombre": "Valoración Sensorial", "escalas": ["Visión Snellen", "Audición - Prueba de susurro"]},
                {"numero": 10, "nombre": "Movilidad y Riesgo de Caídas", "escalas": ["FRAIL", "Levántate y Anda", "SPPB"]},
                {"numero": 11, "nombre": "Valoración Cognitiva", "escalas": ["Fluencia Semántica de Animales", "Mini Cog", "Mini Mental", "MOCA"]},
                {"numero": 12, "nombre": "Valoración Emocional", "escalas": ["Soledad de 3 Ítems", "Ansiedad de Beck", "Escala de Depresión Geriátrica"]},
                {"numero": 14, "nombre": "Maltrato", "escalas": ["Escala Geriátrica de Maltrato"]},
                {"numero": 15, "nombre": "Sobrecarga del Cuidador", "escalas": ["Zarit"]},
                {"numero": 17, "nombre": "Calidad de Vida", "escalas": ["WHOQOL-OLD"]},
                {"numero": 19, "nombre": "Impresión Gerontológica", "campos": ["Observaciones"]},
                {"numero": 20, "nombre": "Plan de Intervención", "campos": ["Objetivo general", "Intervenciones sugeridas", "Frecuencia", "Número de sesiones"]},
                {"numero": 21, "nombre": "Acuerdos con la persona mayor", "tipo": "texto_libre"},
                {"numero": 22, "nombre": "Datos del Profesional", "campos": ["Nombre", "Fecha"]}
            ],
            "flujo_general": "La historia clínica sigue un orden de: datos de identificación → motivo de consulta → metas personales → antecedentes → medicación → valoración funcional → valoración nutricional → valoración sensorial → movilidad → valoración cognitiva → valoración emocional → entorno → maltrato → sobrecarga del cuidador → actividades sociales → calidad de vida → síndromes geriátricos → impresión → plan de intervención → acuerdos → datos del profesional → consentimiento informado."
        }
    }
}

with open('/home/ubuntu/analisis_documentos.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Count stats
n_escalas = len(data['escalas'])
n_preguntas_total = 0
for e in data['escalas']:
    if isinstance(e.get('preguntas'), list):
        n_preguntas_total += len(e['preguntas'])
n_campos_personales = len(data['datos_personales']['campos'])
n_signos = len(data['signos_vitales']['campos'])
aptas_movil = sum(1 for e in data['escalas'] if e.get('apta_para_movil'))

print(f"✅ JSON generado exitosamente")
print(f"   - Escalas/instrumentos: {n_escalas}")
print(f"   - Secciones de preguntas: {n_preguntas_total}")
print(f"   - Campos datos personales: {n_campos_personales}")
print(f"   - Campos signos vitales: {n_signos}")
print(f"   - Escalas aptas para móvil: {aptas_movil}/{n_escalas}")

import os
size_kb = os.path.getsize('/home/ubuntu/analisis_documentos.json') / 1024
print(f"   - Tamaño del archivo: {size_kb:.1f} KB")
