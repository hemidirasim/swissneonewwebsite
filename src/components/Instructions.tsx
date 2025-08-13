import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Baby, 
  Clock, 
  Droplets, 
  Scale, 
  Calculator,
  AlertTriangle,
  Info,
  CheckCircle
} from 'lucide-react';

export const Instructions = () => {
  const { t, language } = useLanguage();
  const { adminData } = useAdminData();
  const navigate = useNavigate();

  const feedingTable = [
    {
      age: language === 'az' ? '0–14 gün' : '0–14 days',
      weight: '2.5–3 kg',
      feedings: '7',
      water: '60 ml',
      scoops: '2'
    },
    {
      age: language === 'az' ? '2–8 həftə' : '2–8 weeks',
      weight: '3–3.5 kg',
      feedings: '6',
      water: '90 ml',
      scoops: '3'
    },
    {
      age: language === 'az' ? '2 ay' : '2 months',
      weight: '3.5–4 kg',
      feedings: '5',
      water: '120 ml',
      scoops: '4'
    },
    {
      age: language === 'az' ? '3 ay' : '3 months',
      weight: '4–5 kg',
      feedings: '5',
      water: '150 ml',
      scoops: '5'
    },
    {
      age: language === 'az' ? '4 ay' : '4 months',
      weight: '5–6 kg',
      feedings: '5',
      water: '180 ml',
      scoops: '6'
    },
    {
      age: language === 'az' ? '5 ay' : '5 months',
      weight: '6–7 kg',
      feedings: '5',
      water: '210 ml',
      scoops: '7'
    },
    {
      age: language === 'az' ? '6 ay və daha çox' : '6 months and more',
      weight: '>7 kg',
      feedings: '4',
      water: '210 ml',
      scoops: '7'
    }
  ];

  const importantNotes = adminData.instructionsSteps?.[language] || [
    'Əllərinizi yaxşıca yuyun',
    'Steril qab istifadə edin',
    'Su qaynadın və soyudun',
    'Düzgün ölçüdə qarışdırın',
    'Temperaturu yoxlayın',
    'Dərhal istifadə edin'
  ];

  const warnings = language === 'az' ? [
    'Təlimata və dozaya ciddi əməl edin',
    'Artıq qalmış qarışığı təkrar istifadə etməyin',
    'Qarışığı qaynatmayın',
    'Mikrodalğalı sobadan istifadə etməyin',
    'Qarışığı quru və sərin yerdə saxlayın',
    'Açıldıqdan sonra 2 həftə ərzində istifadə edin'
  ] : [
    'Strictly follow the instructions and dosage',
    'Do not reuse leftover mixture',
    'Do not boil the mixture',
    'Do not use microwave oven',
    'Store the mixture in a dry and cool place',
    'Use within 2 weeks after opening'
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {language === 'az' ? 'Qidalandırma Təlimatları' : 'Feeding Instructions'}
          </Badge>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'az'
              ? 'Körpənizin yaşına və çəkisinə uyğun olaraq qidalandırma təlimatları. Bu cədvələ ciddi əməl edin.'
              : 'Feeding instructions according to your baby\'s age and weight. Strictly follow this table.'
            }
          </p>
        </div>

        {/* Feeding Table */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">
                {language === 'az' ? '6. Qida Dəyərləri (tipik dəyərlər)' : '6. Food Values (typical values)'}
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">
                      {language === 'az' ? 'Körpənin yaşı' : 'Child\'s age'}
                    </TableHead>
                    <TableHead className="font-semibold">
                      {language === 'az' ? 'Körpənin təxmini çəkisi (kq)' : 'Child\'s weight (kg)'}
                    </TableHead>
                    <TableHead className="font-semibold">
                      {language === 'az' ? '24 saat ərzində qidalandırma sayı' : 'Count of feeding in 24 hours'}
                    </TableHead>
                    <TableHead className="font-semibold">
                      {language === 'az' ? 'Su (ml)' : 'Water (ml)'}
                    </TableHead>
                    <TableHead className="font-semibold">
                      {language === 'az' ? 'Ölçü qaşığı sayı' : 'Measure count'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedingTable.map((row, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{row.age}</TableCell>
                      <TableCell>{row.weight}</TableCell>
                      <TableCell className="text-center">{row.feedings}</TableCell>
                      <TableCell className="text-center">{row.water}</TableCell>
                      <TableCell className="text-center font-semibold text-primary">{row.scoops}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Important Instructions */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Preparation Steps */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold">
                  {language === 'az' ? 'Hazırlanma Addımları' : 'Preparation Steps'}
                </h3>
              </div>
              
              <div className="space-y-4">
                {importantNotes.map((note, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{note}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Important Warnings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold">
                  {language === 'az' ? 'Vacib Qeydlər' : 'Important Notes'}
                </h3>
              </div>
              
              <div className="space-y-4">
                {warnings.map((warning, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{warning}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Baby className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">
                {language === 'az' ? 'Körpənin Ehtiyacları' : 'Baby\'s Needs'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'az'
                  ? 'Hər körpənin fərqli ehtiyacları ola bilər. Həkiminizlə məsləhətləşin.'
                  : 'Each baby may have different needs. Consult with your doctor.'
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">
                {language === 'az' ? 'Qidalandırma Vaxtı' : 'Feeding Time'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'az'
                  ? 'Körpənin aclıq əlamətlərinə diqqət edin və müntəzəm qidalandırın.'
                  : 'Pay attention to baby\'s hunger signs and feed regularly.'
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Scale className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="font-semibold mb-2">
                {language === 'az' ? 'Çəki İzləmə' : 'Weight Monitoring'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'az'
                  ? 'Körpənin çəkisini müntəzəm izləyin və həkimə məlumat verin.'
                  : 'Monitor baby\'s weight regularly and inform your doctor.'
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'az' 
                ? 'Suallarınız var?'
                : 'Have questions?'
              }
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === 'az'
                ? 'Qidalandırma haqqında əlavə məlumat üçün bizimlə əlaqə saxlayın.'
                : 'Contact us for additional information about feeding.'
              }
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/contact')}
                className="px-6 py-2"
              >
                {language === 'az' ? 'Əlaqə' : 'Contact'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
