let mySVG = document.getElementById('plate39');
let gotchaImage = document.getElementById('gotchaImage');
let gotchaText = document.getElementById('gotchaText');

const labelX_1 = 30.7;
const barX = 166.6;
const barHeight = 8;

const labelData = [
  {
    "label_1st": "AGRICULTURAL",
    "label_2nd": "LABORERS",
    "label_3rd": "",
    "populationSize": "98,400"
  },
  {
    "label_1st": "FARMERS AND",
    "label_2nd": "PLANTERS",
    "label_3rd": "",
    "populationSize": "63,012"
  },
  {
    "label_1st": "LABORERS",
    "label_2nd": "",
    "label_3rd": "",
    "populationSize": "29,723"
  },
  {
    "label_1st": "STEAM RAILWAY",
    "label_2nd": "EMPLOYES",
    "label_3rd": "",
    "populationSize": "7,440"
  },
  {
    "label_1st": "SERVANTS",
    "label_2nd": "",
    "label_3rd": "",
    "populationSize": "7,000"
  },
  {
    "label_1st": "DRAYMEN.HACKMEN",
    "label_2nd": "",
    "label_3rd": "",
    "populationSize": "4,390"
  },
  {
    "label_1st": "CARPENTERS AND",
    "label_2nd": "JOINERS",
    "label_3rd": "",
    "populationSize": "3,761"
  },
  {
    "label_1st": "SAW AND PLANING",
    "label_2nd": "MILL EMPLOYES",
    "label_3rd": "",
    "populationSize": "2,471"
  },
  {
    "label_1st": "MESSENGERS",
    "label_2nd": "",
    "label_3rd": "",
    "populationSize": "1,870"
  },
  {
    "label_1st": "WOOD CHOPPERS",
    "label_2nd": "",
    "label_3rd": "",
    "populationSize": "1,399"
  },
  {
    "label_1st": "BLACKSMITHS",
    "label_2nd": "AND",
    "label_3rd": "WHEELWRIGHTS",
    "populationSize": "1,328"
  },
  {
    "label_1st": "CLERGYMEN",
    "label_2nd": "",
    "label_3rd": "",
    "populationSize": "1,277"
  },
  {
    "label_1st": "MASONS",
    "label_2nd": "",
    "label_3rd": "",
    "populationSize": "1,243"
  },
  {
    "label_1st": "BRICK-MAKERS AND",
    "label_2nd": "POTTERS",
    "label_3rd": "",
    "populationSize": 977
  },
  {
    "label_1st": "BARBERS",
    "label_2nd": "",
    "label_3rd": "",
    "populationSize": 899
  },
  {
    "label_1st": "MERCHANTS",
    "label_2nd": "",
    "label_3rd": "",
    "populationSize": 837
  },
  {
    "label_1st": "PAINTERS, GLAZIERS",
    "label_2nd": "AND VARNISHERS",
    "label_3rd": "",
    "populationSize": 676
  },
  {
    "label_1st": "BOOT AND SHOE",
    "label_2nd": "MAKERS",
    "label_3rd": "",
    "populationSize": 632
  },
  {
    "label_1st": "PROFESSORS AND",
    "label_2nd": "TEACHERS",
    "label_3rd": "",
    "populationSize": 620
  },
  {
    "label_1st": "LIVERY STABLE",
    "label_2nd": "KEEPERS",
    "label_3rd": "",
    "populationSize": 620
  },
  {
    "label_1st": "ENGINEERS",
    "label_2nd": "",
    "label_3rd": "",
    "populationSize": 520
  },
  {
    "label_1st": "GARDNERS AND",
    "label_2nd": "FLORISTS",
    "label_3rd": "",
    "populationSize": 519
  }
];

const barFormatData = [
  {
    "labelX_1": 30.7,
    "labelY_1": 4.4,
    "labelX_2": 48.2,
    "labelY_2": 17.5,
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 122.8,
    "populationY": 12,
    "barY": 13.2,
    "barWidth": 491.2,
    "textSize": 12
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 35.1,
    "labelX_2": 43.9,
    "labelY_2": 48.2,
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 122.8,
    "populationY": 42.7,
    "barY": 43.9,
    "barWidth": 500,
    "textSize": 12
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 70.2,
    "labelX_2": "",
    "labelY_2": "",
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 122.8,
    "populationY": 69,
    "barY": 70.2,
    "barWidth": 228,
    "textSize": 11
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 87.7,
    "labelX_2": 43.9,
    "labelY_2": 100.9,
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 129.4,
    "populationY": 95.3,
    "barY": 96.5,
    "barWidth": 52.6,
    "textSize": 10
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 121.6,
    "labelX_2": "",
    "labelY_2": "",
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 127.2,
    "populationY": 121.6,
    "barY": 122.8,
    "barWidth": 48.2,
    "textSize": 11
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 143.5,
    "labelX_2": "",
    "labelY_2": "",
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 129,
    "populationY": 143.5,
    "barY": 144.7,
    "barWidth": 32.9,
    "textSize": 10.5
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 162.3,
    "labelX_2": 57,
    "labelY_2": 175.4,
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 131.6,
    "populationY": 169.9,
    "barY": 171.1,
    "barWidth": 28.5,
    "textSize": 11
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 201.8,
    "labelX_2": 30.7,
    "labelY_2": 214.9,
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 131.6,
    "populationY": 204.9,
    "barY": 206.1,
    "barWidth": 17.5,
    "textSize": 11
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 240,
    "labelX_2": "",
    "labelY_2": "",
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 131.6,
    "populationY": 240,
    "barY": 241.2,
    "barWidth": 11,
    "textSize": 12
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 270.7,
    "labelX_2": "",
    "labelY_2": "",
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 131.6,
    "populationY": 270.7,
    "barY": 271.9,
    "barWidth": 8.8,
    "textSize": 11
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 302.6,
    "labelX_2": 61.4,
    "labelY_2": 315.8,
    "labelX_3": 29,
    "labelY_3": 327.7,
    "populationX": 131.6,
    "populationY": 327.7,
    "barY": 328.9,
    "barWidth": 8.8,
    "textSize": 12
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 362.8,
    "labelX_2": "",
    "labelY_2": "",
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 131.6,
    "populationY": 362.8,
    "barY": 364,
    "barWidth": 8.8,
    "textSize": 12
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 397.9,
    "labelX_2": "",
    "labelY_2": "",
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 131.6,
    "populationY": 397.9,
    "barY": 399.1,
    "barWidth": 8.8,
    "textSize": 12
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 438.6,
    "labelX_2": 61.4,
    "labelY_2": 450.6,
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 138.2,
    "populationY": 450.6,
    "barY": 451.8,
    "barWidth": 6.6,
    "textSize": 12
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 490,
    "labelX_2": "",
    "labelY_2": "",
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 136,
    "populationY": 490,
    "barY": 491.2,
    "barWidth": 4.4,
    "textSize": 12
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 525.1,
    "labelX_2": "",
    "labelY_2": "",
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 136,
    "populationY": 525.1,
    "barY": 526.3,
    "barWidth": 4.4,
    "textSize": 12
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 565.8,
    "labelX_2": 32.9,
    "labelY_2": 577.7,
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 136,
    "populationY": 577.7,
    "barY": 578.9,
    "barWidth": 4.4,
    "textSize": 12
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 618.4,
    "labelX_2": 54.8,
    "labelY_2": 631.6,
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 138.2,
    "populationY": 621.6,
    "barY": 622.8,
    "barWidth": 4.4,
    "textSize": 12
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 664.5,
    "labelX_2": 52.6,
    "labelY_2": 678.6,
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 138.2,
    "populationY": 678.6,
    "barY": 679.8,
    "barWidth": 4.4,
    "textSize": 12
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 710.5,
    "labelX_2": 48.2,
    "labelY_2": 723.7,
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 136,
    "populationY": 713.7,
    "barY": 714.9,
    "barWidth": 4.4,
    "textSize": 13
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 753.2,
    "labelX_2": "",
    "labelY_2": "",
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 136,
    "populationY": 753.2,
    "barY": 754.4,
    "barWidth": 2.2,
    "textSize": 13
  },
  {
    "labelX_1": 30.7,
    "labelY_1": 780.7,
    "labelX_2": 48.2,
    "labelY_2": 793.9,
    "labelX_3": "",
    "labelY_3": "",
    "populationX": 140.4,
    "populationY": 788.3,
    "barY": 789.5,
    "barWidth": 2.2,
    "textSize": 12
  }
];

function createSVGrect(xPos, yPos, width, height) {
  let SVGrect = document.createElementNS('http://www.w3.org/2000/svg','rect');
  SVGrect.addEventListener('mouseover', function(){
    SVGrect.setAttribute('class','active');
    gotchaImage.style.visibility = 'visible';
    gotchaText.style.visibility = 'visible';
  });
  SVGrect.addEventListener('mouseout', function(){
    SVGrect.setAttribute('class','');
    gotchaImage.style.visibility = 'hidden';
    gotchaText.style.visibility = 'hidden';
  });
  SVGrect.setAttribute('x', xPos);
  SVGrect.setAttribute('y', yPos);
  SVGrect.setAttribute('width', width);
  SVGrect.setAttribute('height', height);
  return SVGrect
}

function createSVGtext(xPos, yPos, textContent, fontSize){
  let textLabel = document.createElementNS('http://www.w3.org/2000/svg','text');
  textLabel.setAttribute('x', xPos);
  textLabel.setAttribute('y', yPos);
  textLabel.setAttribute('dominant-baseline', 'hanging');
  textLabel.style.fontSize = fontSize;
  textLabel.textContent = textContent;
  return textLabel
}

function createSVGpath(pathString){
  let SVGpath = document.createElementNS('http://www.w3.org/2000/svg','path');
  SVGpath.addEventListener('mouseover', function(){
    SVGpath.setAttribute('class','active');
    gotchaImage.style.visibility = 'visible';
    gotchaText.style.visibility = 'visible';
  });
  SVGpath.addEventListener('mouseout', function(){
    SVGpath.setAttribute('class','');
    gotchaImage.style.visibility = 'hidden';
    gotchaText.style.visibility = 'hidden';
  });
  SVGpath.setAttribute('d', pathString);
  return SVGpath
}

for (let i=0; i<labelData.length; i++) {
  let itemGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
  itemGroup.appendChild(createSVGtext(labelX_1, barFormatData[i].labelY_1, labelData[i].label_1st, barFormatData[i].textSize));
  if (labelData[i].label_2nd != '') itemGroup.appendChild(createSVGtext(barFormatData[i].labelX_2, barFormatData[i].labelY_2, labelData[i].label_2nd, barFormatData[i].textSize));
  if (labelData[i].label_3rd !='') itemGroup.appendChild(createSVGtext(barFormatData[i].labelX_3, barFormatData[i].labelY_3, labelData[i].label_3rd, barFormatData[i].textSize));
  itemGroup.appendChild(createSVGtext(barFormatData[i].populationX, barFormatData[i].populationY, labelData[i].populationSize, barFormatData[i].textSize));

  if (i==0){
    itemGroup.appendChild(createSVGpath("M 166.6 17" +
                                        "L 657.5 17" +
                                        "A 1 1 0 0 1 657.5 30.2" +
                                        "L 425.4 30"));
  }
  else{
    itemGroup.appendChild(createSVGrect(barX, barFormatData[i].barY, barFormatData[i].barWidth, barHeight));
  }

itemGroup.appendChild(createSVGtext(280, 250, 'Hover mouse over rectangles for more info...', '15px'));

mySVG.appendChild(itemGroup);
};