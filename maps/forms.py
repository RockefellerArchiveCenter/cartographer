from django import forms

from .models import ArrangementMap


class ArrangementMapForm(forms.ModelForm):
    class Meta:
        model = ArrangementMap
        fields = ('title',)
        labels = {'title': 'Title',}
        help_texts = {'title': "A title for the Arrangement Map."}
        widgets = {'title': forms.widgets.TextInput(attrs={'class': 'form-control', 'aria-describedby': "id_titleHelpBlock"}),}
