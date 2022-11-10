import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

interface Country {
	id?: number;
	name: string;
	flag: string;
	area: number;
	population: number;
}

const COUNTRIES: Country[] = [
	{
		name: 'Russia',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: 17075200,
		population: 146989754,
	},
	{
		name: 'France',
		flag: 'c/c3/Flag_of_France.svg',
		area: 640679,
		population: 64979548,
	},
];

function search(text: string, pipe: PipeTransform): Country[] {
	return COUNTRIES.filter((country) => {
		const term = text.toLowerCase();
		return (
			country.name.toLowerCase().includes(term) ||
			pipe.transform(country.area).includes(term) ||
			pipe.transform(country.population).includes(term)
		);
	});
}

@Component({
  selector: 'app-production-management',
  templateUrl: './production-management.component.html',
  styleUrls: ['./production-management.component.css']
})
export class ProductionManagementComponent implements OnInit {

  countries$!: Observable<Country[]>;
  filter = new FormControl('');
  active = 1;
  constructor(pipe: DecimalPipe) {
    this.countries$ = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => search(text, pipe)),
		);
  }

  ngOnInit(): void {
  }

}
