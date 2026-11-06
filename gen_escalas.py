# -*- coding: utf-8 -*-
import json, re, unicodedata

d = json.load(open('/home/ubuntu/analisis_documentos.json'))
escalas = d['escalas']
by_name = {e['nombre']: e for e in escalas}

def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii','ignore').decode()
    s = re.sub(r'[^a-zA-Z0-9]+','-',s).strip('-').lower()
    return s

SINO = lambda si=1, no=0: [{'etiqueta':'Sí','puntaje':si},{'etiqueta':'No','puntaje':no}]

META = {
 'Escala de Depresión Geriátrica Simplificada de 5 Preguntas (GDS-5)': dict(id='gds5', corto='GDS-5', cat='Afectiva'),
 'Escala de Depresión Geriátrica Abreviada (GDS-15)': dict(id='gds15', corto='GDS-15', cat='Afectiva'),
 'Mini-Examen del Estado Mental (MMSE / Minimental de Folstein)': dict(id='mmse', corto='MMSE (Minimental)', cat='Cognitiva'),
 'Cuestionario de Incontinencia Urinaria': dict(id='incontinencia', corto='Incontinencia Urinaria', cat='Síndromes Geriátricos'),
 'Síndrome de Caídas (Detección)': dict(id='caidas-deteccion', corto='Síndrome de Caídas', cat='Marcha y Caídas'),
 'INGERDESICA - Investigación Gerontológica del Riesgo para el Desarrollo del Síndrome de Caídas': dict(id='ingerdesica', corto='INGERDESICA', cat='Marcha y Caídas'),
 'Índice de Independencia en las Actividades Básicas de la Vida Diaria (Katz)': dict(id='katz', corto='Índice de Katz (ABVD)', cat='Funcional'),
 'Índice de Actividades Instrumentales de la Vida Diaria (Lawton & Brody)': dict(id='lawton', corto='Lawton & Brody (AIVD)', cat='Funcional'),
 'Cuestionario para Detección de Riesgo de Fracturas por Osteoporosis': dict(id='osteoporosis', corto='Riesgo de Fracturas (Osteoporosis)', cat='Síndromes Geriátricos'),
 'Factores de Riesgo para el Desarrollo de Demencia': dict(id='riesgo-demencia', corto='Factores de Riesgo de Demencia', cat='Cognitiva'),
 'IQCODE - Cuestionario del Informante Sobre Deterioro Cognoscitivo en el Anciano': dict(id='iqcode', corto='IQCODE', cat='Cognitiva'),
 'Prueba Levántate y Anda (Timed Up and Go / Get Up and Go)': dict(id='tug', corto='Levántate y Anda (TUG)', cat='Marcha y Caídas'),
 'Cuestionario de Sobrecarga del Cuidador (Zarit & Zarit)': dict(id='zarit', corto='Zarit (Sobrecarga del Cuidador)', cat='Social y Familiar'),
 'APGAR Familiar': dict(id='apgar', corto='APGAR Familiar', cat='Social y Familiar'),
 'Cuestionario de Apoyo Social Percibido (DUKE-UNC)': dict(id='duke-unc', corto='DUKE-UNC (Apoyo Social)', cat='Social y Familiar'),
 'Fluencia Verbal Semántica (Animales)': dict(id='fluencia-animales', corto='Fluencia Verbal (Animales)', cat='Cognitiva'),
 'Mini-Cog': dict(id='mini-cog', corto='Mini-Cog', cat='Cognitiva'),
 'MoCA - Evaluación Cognitiva de Montreal': dict(id='moca', corto='MoCA', cat='Cognitiva'),
 'SPPB - Batería Corta de Desempeño Físico': dict(id='sppb', corto='SPPB', cat='Marcha y Caídas'),
 'FRAIL - Escala de Fragilidad': dict(id='frail', corto='FRAIL (Fragilidad)', cat='Síndromes Geriátricos'),
 'Velocidad de la Marcha': dict(id='velocidad-marcha', corto='Velocidad de la Marcha', cat='Marcha y Caídas'),
 'MNA-SF - Mini Evaluación Nutricional (Formato Corto)': dict(id='mna-sf', corto='MNA-SF (Nutricional)', cat='Nutricional'),
 'SARC-F - Cuestionario de Sarcopenia': dict(id='sarc-f', corto='SARC-F (Sarcopenia)', cat='Nutricional'),
 'Escala Geriátrica de Maltrato': dict(id='maltrato', corto='Escala de Maltrato', cat='Social y Familiar'),
 'Prueba del Susurro (Valoración de Agudeza Auditiva)': dict(id='susurro', corto='Prueba del Susurro', cat='Sensorial'),
}

def rng(mn, mx, res):
    return {'min': mn, 'max': mx, 'resultado': res}

out = []

for e in escalas:
    m = META[e['nombre']]
    esc = {
        'id': m['id'], 'nombre': e['nombre'], 'nombreCorto': m['corto'], 'categoria': m['cat'],
        'descripcion': e.get('descripcion',''), 'fuente': e.get('fuente'),
        'tiempoAplicacion': e.get('tiempo_aplicacion'),
        'aptaMovil': e.get('apta_para_movil', True), 'razonNoApta': e.get('razon_no_apta'),
        'metodoPuntuacion': (e.get('puntuacion') or {}).get('metodo'),
        'rango': (e.get('puntuacion') or {}).get('rango'),
        'items': [], 'interpretacion': [], 'cualitativa': False, 'divisor': None, 'notaInterpretacion': None,
    }
    eid = m['id']
    P = e['preguntas']

    def add_opt(iid, texto, opciones, seccion=None, instruccion=None, nota=None, opcional=False):
        esc['items'].append({'id': iid, 'texto': texto, 'tipo': 'opciones', 'opciones': opciones,
                             'seccion': seccion, 'instruccion': instruccion, 'nota': nota, 'opcional': opcional})
    def add_num(iid, texto, mn, mx, step=1, unidad=None, seccion=None, instruccion=None, nota=None):
        esc['items'].append({'id': iid, 'texto': texto, 'tipo': 'numero', 'min': mn, 'max': mx, 'step': step,
                             'unidad': unidad, 'seccion': seccion, 'instruccion': instruccion, 'nota': nota, 'opcional': False})

    if eid in ('gds5','gds15'):
        for q in P:
            dep = q['respuesta_depresion'].upper()
            si = 1 if dep=='SI' else 0
            add_opt(f"q{q['numero']}", f"{q['numero']}. {q['texto']}", SINO(si, 1-si))
        if eid=='gds5':
            esc['interpretacion'] = [rng(0,0,'Sin depresión'), rng(1,2,'Depresión leve'), rng(3,4,'Depresión moderada'), rng(5,5,'Depresión severa')]
        else:
            esc['interpretacion'] = [rng(0,5,'Sin sintomatología depresiva'), rng(6,15,'Con sintomatología depresiva')]
            esc['notaInterpretacion'] = 'Guía INGER: 0-4 Normal; 5 o más: presencia de síntomas depresivos.'

    elif eid=='mmse':
        for i, sec in enumerate(P):
            pm = sec.get('puntos_maximos', 1)
            instr_parts = []
            for k in ('instruccion','instruccion_escolaridad_alta','instruccion_escolaridad_baja'):
                if sec.get(k): instr_parts.append(sec[k])
            if sec.get('palabras'): instr_parts.append('Palabras: ' + ', '.join(sec['palabras']))
            if sec.get('ordenes'): instr_parts.append(' '.join(sec['ordenes']))
            if sec.get('items'): instr_parts.append(' | '.join(f"{it['numero']}. {it['texto']}" for it in sec['items']))
            add_num(f's{i}', f"{sec['seccion']} (0-{pm} puntos)", 0, pm, 1, 'puntos',
                    seccion=sec['seccion'], instruccion=' — '.join(instr_parts) or None, nota=sec.get('nota'))
        esc['interpretacion'] = [rng(0,23,'Probable deterioro cognitivo (positivo)'), rng(24,30,'Sin deterioro cognitivo (negativo)')]
        esc['notaInterpretacion'] = 'Para personas con ≤3 años de escolaridad se otorgan 8 puntos base y no se aplican 4 reactivos específicos.'

    elif eid in ('incontinencia','caidas-deteccion','osteoporosis','frail'):
        for q in P:
            comp = q.get('componente')
            texto = f"{q['numero']}. {q['texto']}" + (f" ({comp})" if comp else '')
            opts = [{'etiqueta': o['valor'], 'puntaje': o['puntaje']} for o in e['opciones_respuesta']]
            add_opt(f"q{q['numero']}", texto, opts)
        if eid=='incontinencia':
            esc['interpretacion'] = [rng(0,0,'Negativo (sin incontinencia)'), rng(1,4,'Positivo (posible incontinencia urinaria)')]
        elif eid=='caidas-deteccion':
            esc['interpretacion'] = [rng(0,0,'Negativo'), rng(1,1,'Positivo: se sugiere aplicar valoración de marcha y equilibrio')]
        elif eid=='osteoporosis':
            esc['interpretacion'] = []
            esc['notaInterpretacion'] = 'El puntaje total debe cruzarse con edad, sexo e IMC en la Tabla de Riesgo de Fracturas por Osteoporosis para determinar Bajo, Mediano o Alto Riesgo. Con 7-9 puntos se considera igual a 6 para la tabla.'
            esc['cualitativa'] = True
        else:
            esc['interpretacion'] = [rng(0,0,'Sin fragilidad o robustez'), rng(1,2,'Probable pre-fragilidad'), rng(3,5,'Probable fragilidad')]

    elif eid=='ingerdesica':
        n=0
        for sec in P:
            for it in sec['items']:
                n+=1
                add_opt(f'q{n}', f'{n}. {it}', SINO(0,0), seccion=sec['seccion'])
        esc['cualitativa'] = True
        esc['interpretacion'] = []
        esc['notaInterpretacion'] = "No tiene línea de corte. Cada respuesta 'No' (o condición de riesgo presente) indica un factor de riesgo que requiere una intervención específica para el tópico descrito."

    elif eid in ('katz','lawton'):
        for i,q in enumerate(P):
            opts = [{'etiqueta': o['texto'], 'puntaje': o['puntaje']} for o in q['opciones']]
            add_opt(f'q{i+1}', f"{i+1}. {q['actividad']}", opts)
        if eid=='katz':
            esc['interpretacion'] = [rng(0,0,'No hay deterioro funcional (Negativo)'), rng(0.5,2,'Deterioro funcional leve'), rng(2.5,4,'Deterioro funcional moderado'), rng(4.5,6,'Deterioro funcional severo')]
        else:
            esc['interpretacion'] = [rng(0,0,'Dependiente'), rng(1,6,'Semidependiente'), rng(7,8,'Independiente')]
            esc['notaInterpretacion'] = 'El máximo puede ser menor si se omiten actividades nunca realizadas por la PAM.'

    elif eid=='riesgo-demencia':
        for q in P:
            opts = [{'etiqueta': o['texto'], 'puntaje': o['puntaje']} for o in q['opciones']]
            add_opt(f"q{q['numero']}", f"{q['numero']}. {q['texto']}", opts)
        esc['interpretacion'] = [rng(0,7,'Bajo Riesgo'), rng(8,11,'Mediano Riesgo'), rng(12,20,'Alto Riesgo')]

    elif eid=='iqcode':
        opts = [{'etiqueta': o['valor'], 'puntaje': o['puntaje']} for o in e['opciones_respuesta']]
        for q in P:
            add_opt(f"q{q['numero']}", f"{q['numero']}. {q['texto']}", opts)
        esc['divisor'] = 16
        esc['interpretacion'] = [rng(1,3.49,'Sin deterioro cognitivo probable'), rng(3.5,5,'Probable deterioro cognitivo')]
        esc['notaInterpretacion'] = 'El puntaje final es el promedio: suma total dividida entre 16.'

    elif eid=='tug':
        instr = ' '.join(q['instruccion'] for q in P)
        add_num('tiempo', 'Tiempo total (segundos)', 0, 300, 0.1, 'segundos', instruccion=instr)
        esc['interpretacion'] = [rng(0,9.99,'Normal'), rng(10,13,'Discapacidad leve de la movilidad'), rng(13.01,10000,'Riesgo elevado de caídas')]
        esc['notaInterpretacion'] = 'Interpretación según Guía INGER (<10 s normal; 11-13 s discapacidad leve; >13 s riesgo elevado de caídas). Según el formato del laboratorio: <20 s Normal, >20 s Anormal.'

    elif eid in ('zarit','apgar','duke-unc'):
        opts = [{'etiqueta': o['valor'], 'puntaje': o['puntaje']} for o in e['opciones_respuesta']]
        for q in P:
            add_opt(f"q{q['numero']}", f"{q['numero']}. {q['texto']}", opts)
        if eid=='zarit':
            esc['interpretacion'] = [rng(0,46,'No se encuentra en sobrecarga'), rng(47,55,'Sobrecarga leve'), rng(56,88,'Sobrecarga intensa')]
        elif eid=='apgar':
            esc['interpretacion'] = [rng(0,9,'Disfunción familiar severa'), rng(10,13,'Disfunción familiar moderada'), rng(14,17,'Disfunción familiar leve'), rng(18,28,'Buena función familiar')]
        else:
            esc['interpretacion'] = [rng(0,31,'Percepción baja de apoyo social'), rng(32,55,'Percepción adecuada de apoyo social')]

    elif eid=='fluencia-animales':
        add_num('total', 'Número de animales válidos evocados en 1 minuto', 0, 60, 1, 'animales', instruccion=P[0]['instruccion'])
        esc['cualitativa'] = True
        esc['interpretacion'] = []
        esc['notaInterpretacion'] = 'Consultar tablas normativas de fluencia verbal semántica según edad y escolaridad. No se consideran nombres propios, palabras incorrectas, variaciones o repeticiones.'

    elif eid=='mini-cog':
        esc['items'].append({'id':'registro','texto':'Registro de 3 palabras (no puntúa)','tipo':'info',
            'seccion':'Registro de 3 palabras','instruccion':P[0]['instruccion'],'nota':P[0].get('nota'),'opcional':True})
        add_opt('reloj','Dibujo del reloj', [{'etiqueta':'Reloj normal (2 puntos)','puntaje':2},{'etiqueta':'Reloj anormal (0 puntos)','puntaje':0}],
                seccion='Dibujo del reloj', instruccion=P[1]['instruccion'], nota=P[1].get('nota'))
        add_num('evocacion','Palabras recordadas (0-3)',0,3,1,'palabras',seccion='Evocación de 3 palabras',instruccion=P[2]['instruccion'])
        esc['interpretacion'] = [rng(0,2,'Probable deterioro cognitivo, se recomienda evaluación más amplia'), rng(3,5,'Muy poco probable que haya deterioro cognitivo')]

    elif eid=='moca':
        maxes = {'Visuoespacial/Ejecutiva':5,'Identificación y nominación':3,'Memoria':5,'Atención':6,'Lenguaje':3,'Abstracción':2,'Orientación':6}
        for i,sec in enumerate(P):
            pm = maxes.get(sec['seccion'],5)
            add_num(f's{i}', f"{sec['seccion']} (0-{pm} puntos)", 0, pm, 1, 'puntos', seccion=sec['seccion'],
                    instruccion=' | '.join(sec.get('items',[])))
        esc['interpretacion'] = [rng(0,25,'Probable trastorno neurocognitivo'), rng(26,31,'Normal')]
        esc['notaInterpretacion'] = 'Si la escolaridad es ≤ 12 años, agregar 1 punto al total (máximo 30). En la sección Memoria solo puntúa la evocación diferida (0-5).'

    elif eid=='sppb':
        for i,sec in enumerate(P):
            instr = sec.get('instruccion')
            if sec.get('items'):
                extra = ' | '.join(f"{it['posicion']} ({it['duracion']})" for it in sec['items'])
                instr = (instr + ' — ' if instr else '') + extra
            add_num(f's{i}', f"{sec['seccion']} (0-4 puntos)", 0, 4, 1, 'puntos', seccion=sec['seccion'], instruccion=instr)
        esc['interpretacion'] = [rng(0,7.99,'Desempeño físico bajo'), rng(8,12,'Desempeño físico adecuado')]

    elif eid=='velocidad-marcha':
        add_num('tiempo','Tiempo para caminar 4 metros (segundos)',0,120,0.1,'segundos',instruccion=P[0]['instruccion'])
        esc['interpretacion'] = [rng(0,3.99,'Velocidad ≥ 1 m/seg: desempeño normal'), rng(4,4.99,'Velocidad < 1 m/seg: predice riesgo de desenlaces adversos'), rng(5,10000,'Velocidad < 0.8 m/seg: disminución de desempeño (componente de sarcopenia)')]
        esc['notaInterpretacion'] = 'Velocidad = 4 metros ÷ tiempo en segundos.'

    elif eid=='mna-sf':
        mna_opts = {
         'A': [('Ha comido mucho menos',0),('Ha comido menos',1),('Ha comido igual',2)],
         'B': [('Pérdida de peso > 3 kg',0),('No lo sabe',1),('Pérdida entre 1 y 3 kg',2),('Sin pérdida de peso',3)],
         'C': [('De la cama al sillón',0),('Autonomía en el interior',1),('Sale del domicilio',2)],
         'D': [('Sí',0),('No',2)],
         'E': [('Demencia o depresión grave',0),('Demencia moderada',1),('Sin problemas psicológicos',2)],
         'F1': [('IMC < 19',0),('IMC 19 a < 21',1),('IMC 21 a < 23',2),('IMC ≥ 23',3)],
         'F2': [('Circunferencia < 31 cm',0),('Circunferencia ≥ 31 cm',3)],
        }
        for q in P:
            opts = [{'etiqueta': t, 'puntaje': p} for t,p in mna_opts[q['item']]]
            opcional = q['item'] in ('F1','F2')
            nota = 'Responder F1 o F2, solo una de las dos.' if opcional else None
            add_opt(q['item'], f"{q['item']}. {q['texto']}", opts, opcional=opcional, nota=nota)
        esc['interpretacion'] = [rng(0,7,'Desnutrición'), rng(8,11,'Riesgo de desnutrición'), rng(12,14,'Estado nutricional normal')]

    elif eid=='sarc-f':
        for i,q in enumerate(P):
            opts = [{'etiqueta': o['texto'], 'puntaje': o['puntaje']} for o in q['opciones']]
            add_opt(f'q{i+1}', f"{i+1}. {q['texto']} ({q['componente']})", opts)
        esc['interpretacion'] = [rng(0,3,'Baja probabilidad de sarcopenia'), rng(4,10,'Alta probabilidad de sarcopenia')]

    elif eid=='maltrato':
        n=0
        for sec in P:
            for it in sec['items_ejemplo']:
                n+=1
                add_opt(f'q{n}', f'{n}. {it}', SINO(1,0), seccion=sec['seccion'])
        esc['interpretacion'] = [rng(0,0,'Sin indicadores de maltrato'), rng(1,100,'Posible maltrato: revisar los dominios con respuestas afirmativas y especificar el tipo')]
        esc['notaInterpretacion'] = 'Valoración cualitativa: cada respuesta afirmativa es indicador de posible maltrato en el dominio correspondiente.'

    elif eid=='susurro':
        opts = [{'etiqueta':'Repite correctamente (Adecuada)','puntaje':0},{'etiqueta':'No repite correctamente (Disminuida)','puntaje':1}]
        add_opt('od','Oído derecho', opts, instruccion=P[0]['instruccion'])
        add_opt('oi','Oído izquierdo', opts)
        esc['interpretacion'] = [rng(0,0,'Agudeza auditiva adecuada en ambos oídos'), rng(1,2,'Agudeza auditiva disminuida (en uno o ambos oídos)')]

    else:
        raise Exception('sin handler: '+eid)

    # clean Nones in items
    for it in esc['items']:
        for k in list(it.keys()):
            if it[k] is None: del it[k]
    for k in list(esc.keys()):
        if esc[k] is None: del esc[k]
    out.append(esc)

CATS = ['Cognitiva','Afectiva','Funcional','Marcha y Caídas','Nutricional','Sensorial','Social y Familiar','Síndromes Geriátricos']

consent = d['consentimiento_informado']
primera = d['primera_cita']

ts = '''// Archivo generado automáticamente a partir de analisis_documentos.json — Escalas geriátricas del laboratorio
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

export const CATEGORIAS: string[] = __CATS__;

export const ESCALAS: Escala[] = __ESCALAS__;

export const TEXTO_CONSENTIMIENTO: string = __CONSENT__;

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
'''

ts = ts.replace('__CATS__', json.dumps(CATS, ensure_ascii=False))
ts = ts.replace('__ESCALAS__', json.dumps(out, ensure_ascii=False, indent=1))
ts = ts.replace('__CONSENT__', json.dumps(consent['texto'], ensure_ascii=False))

open('/home/ubuntu/lab_envejecimiento/nextjs_space/lib/escalas-data.ts','w').write(ts)
print('OK', len(out), 'escalas; items:', sum(len(e['items']) for e in out))
