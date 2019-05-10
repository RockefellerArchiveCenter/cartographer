from django import forms

from .models import ArrangementMap, ArrangementMapComponent


class ArrangementMapForm(forms.ModelForm):
    class Meta:
        model = ArrangementMap
        fields = ('title',)
        labels = {'title': 'Title',}
        help_texts = {'title': "A title for the Arrangement Map."}
        widgets = {'title': forms.widgets.TextInput(attrs={'class': 'form-control', 'aria-describedby': "id_titleHelpBlock"}),}


class ArrangementMapComponentForm(forms.ModelForm):
    class Meta:
        model = ArrangementMapComponent
        fields = ('title', 'archivesspace_uri',)
        labels = {'title': 'Title', 'archivesspace_uri': "ArchivesSpace URI"}
        help_texts = {
            'title': "A title for the Arrangement Map Component. If this component exists in ArchivesSpace, this field will be auto populated.",
            'archivesspace_uri': "A URI for an ArchivesSpace resource record"
            }
        widgets = {
            'title': forms.widgets.TextInput(attrs={'class': 'form-control', 'aria-describedby': "id_titleHelpBlock"}),
            'archivesspace_uri': forms.widgets.TextInput(attrs={'class': 'form-control', 'aria-describedby': "id_archivesspace_uriHelpBlock"}),
            }
